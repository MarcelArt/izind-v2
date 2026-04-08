import { createFileRoute } from '@tanstack/react-router';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';
import { db } from '@/db';
import { documents } from '@/db/schema';

export const Route = createFileRoute('/api/documents/upload')({
  server: {
    handlers: {
      POST: async ({ request }: { request: Request }) => {
        try {
          const formData = await request.formData();
          const file = formData.get('file') as File;
          const filename = formData.get('filename') as string;
          const type = formData.get('type') as string;
          const tags = JSON.parse(formData.get('tags') as string || '[]');
          const profileId = parseInt(formData.get('profileId') as string);

          if (!file || !filename || !type || !profileId) {
            return new Response(
              JSON.stringify({ error: 'Missing required fields' }),
              { status: 400, headers: { 'Content-Type': 'application/json' } }
            );
          }

          // Get file extension from the uploaded file
          const fileExtension = file.name.split('.').pop() || '';
          const sanitizedFilename = filename.replace(/[^a-zA-Z0-9]/g, '-');
          const timestamp = Date.now();

          // Create the new filename
          const newFilename = `${sanitizedFilename}-${profileId}-${type}-${timestamp}.${fileExtension}`;

          // Ensure uploads directory exists
          const uploadsDir = join(process.cwd(), 'public', 'uploads');
          if (!existsSync(uploadsDir)) {
            await mkdir(uploadsDir, { recursive: true });
          }

          // Save the file
          const filePath = join(uploadsDir, newFilename);
          const bytes = await file.arrayBuffer();
          const buffer = Buffer.from(bytes);
          await writeFile(filePath, buffer);

          // Create document record in database
          const [document] = await db
            .insert(documents)
            .values({
              filename,
              path: `/uploads/${newFilename}`,
              type,
              tags,
              profileId,
            })
            .returning();

          return new Response(
            JSON.stringify({ success: true, document }),
            { status: 200, headers: { 'Content-Type': 'application/json' } }
          );
        } catch (error) {
          console.error('Upload error:', error);
          return new Response(
            JSON.stringify({ error: 'Failed to upload document', message: (error as Error).message }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
          );
        }
      },
    },
  },
});

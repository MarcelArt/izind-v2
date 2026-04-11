import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { FileIcon, MoreVerticalIcon, IdCardIcon, HomeIcon, BookIcon, AwardIcon, CarIcon } from 'lucide-react';
import type { Document } from '@/@types/document';
import { ShareDialog } from './share-dialog';
import { useState } from 'react';

export type DocumentType = 'id card' | 'kk' | 'passport' | 'certificate' | 'driving license' | 'other';

function getFileIcon(type: DocumentType) {
  const iconMap: Record<DocumentType, React.ReactNode> = {
    'id card': <IdCardIcon className="text-blue-500" />,
    kk: <HomeIcon className="text-green-500" />,
    passport: <BookIcon className="text-purple-500" />,
    certificate: <AwardIcon className="text-yellow-500" />,
    'driving license': <CarIcon className="text-orange-500" />,
    other: <FileIcon className="text-gray-400" />,
  };
  return iconMap[type] || <FileIcon className="text-gray-400" />;
}

function getDocumentTypeLabel(type: DocumentType): string {
  const labels: Record<DocumentType, string> = {
    'id card': 'ID Card',
    kk: 'Family Card (KK)',
    passport: 'Passport',
    certificate: 'Certificate',
    'driving license': 'Driving License',
    other: 'Other',
  };
  return labels[type] || type;
}

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(date));
}

interface DocumentGridCardProps {
  document: Document;
  onUpdateClicked: () => void;
}

function isImageFile(path: string): boolean {
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp', '.svg'];
  return imageExtensions.some((ext) => path.toLowerCase().endsWith(ext));
}

export function DocumentGridCard({ document, onUpdateClicked }: DocumentGridCardProps) {
  const [isShareOpen, setIsShareOpen] = useState(false);
  const isImage = isImageFile(document.path);

  return (
    <Card className="group cursor-pointer transition-all hover:shadow-md">
      <CardHeader className="p-4">
        <div className="mb-3 flex items-start justify-between">
          {isImage ? (
            <div className="h-12 w-12 overflow-hidden rounded-lg bg-muted">
              <img src={document.path} alt={document.filename} className="h-full w-full object-cover" loading="lazy" />
            </div>
          ) : (
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted">{getFileIcon(document.type as DocumentType)}</div>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100">
                <MoreVerticalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <a href={document.path}>Download</a>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onUpdateClicked}>Update</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setIsShareOpen(true)}>Share</DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <CardTitle className="truncate text-base">{document.filename}</CardTitle>
        <CardDescription className="line-clamp-2">{document.path}</CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="flex flex-wrap gap-1">
          <Badge variant="outline" className="text-xs">
            {getDocumentTypeLabel(document.type as DocumentType)}
          </Badge>
          {document.tags?.slice(0, 2).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
          {document.tags && document.tags.length > 2 && (
            <Badge variant="secondary" className="text-xs">
              +{document.tags.length - 2}
            </Badge>
          )}
        </div>
        <p className="mt-2 text-xs text-muted-foreground">{formatDate(document.updatedAt)}</p>
      </CardContent>
      <ShareDialog value={document.path} open={isShareOpen} onOpenChange={setIsShareOpen} />
    </Card>
  );
}

interface DocumentListItemProps {
  document: Document;
  onUpdateClicked: () => void;
}

export function DocumentListItem({ document, onUpdateClicked }: DocumentListItemProps) {
  const [isShareOpen, setIsShareOpen] = useState(false);

  return (
    <div className="flex items-center gap-4 p-4 transition-colors hover:bg-muted/50">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">{getFileIcon(document.type as DocumentType)}</div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium">{document.filename}</p>
        <p className="truncate text-xs text-muted-foreground">{document.path}</p>
      </div>
      <Badge variant="outline" className="text-xs whitespace-nowrap">
        {getDocumentTypeLabel(document.type as DocumentType)}
      </Badge>
      <div className="flex flex-wrap gap-1">
        {document.tags?.slice(0, 2).map((tag) => (
          <Badge key={tag} variant="secondary" className="text-xs">
            {tag}
          </Badge>
        ))}
      </div>
      <p className="text-sm text-muted-foreground">{formatDate(document.updatedAt)}</p>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreVerticalIcon className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>
            <a href={document.path}>Download</a>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onUpdateClicked}>Update</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsShareOpen(true)}>Share</DropdownMenuItem>
          <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ShareDialog value={document.path} open={isShareOpen} onOpenChange={setIsShareOpen} />
    </div>
  );
}

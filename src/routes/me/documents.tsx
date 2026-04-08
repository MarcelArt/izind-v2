import { createFileRoute } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/context/auth-context';
import { getProfileByUserIdOption } from '@/queries/profile.query';
import { getDocumentsByProfileIdOption } from '@/queries/document.query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import {
  FileIcon,
  MoreVerticalIcon,
  PlusIcon,
  SearchIcon,
  GridIcon,
  ListIcon,
  IdCardIcon,
  HomeIcon,
  BookIcon,
  AwardIcon,
  CarIcon,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import { Input } from '@/components/ui/input';

export type DocumentType = 'id card' | 'kk' | 'passport' | 'certificate' | 'driving license' | 'other';

export const Route = createFileRoute('/me/documents')({
  component: RouteComponent,
});

function getFileIcon(type: DocumentType) {
  const iconMap: Record<DocumentType, React.ReactNode> = {
    'id card': <IdCardIcon className="text-blue-500" />,
    'kk': <HomeIcon className="text-green-500" />,
    'passport': <BookIcon className="text-purple-500" />,
    'certificate': <AwardIcon className="text-yellow-500" />,
    'driving license': <CarIcon className="text-orange-500" />,
    'other': <FileIcon className="text-gray-400" />,
  };
  return iconMap[type] || <FileIcon className="text-gray-400" />;
}

function getDocumentTypeLabel(type: DocumentType): string {
  const labels: Record<DocumentType, string> = {
    'id card': 'ID Card',
    'kk': 'Family Card (KK)',
    'passport': 'Passport',
    'certificate': 'Certificate',
    'driving license': 'Driving License',
    'other': 'Other',
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

function RouteComponent() {
  const { userId } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedType, setSelectedType] = useState<DocumentType | 'all'>('all');

  const { data: profile, status: profileStatus } = useQuery(getProfileByUserIdOption(userId));

  const profileId = profile?.id;

  const { data: documents = [], status: documentsStatus } = useQuery({
    ...getDocumentsByProfileIdOption(profileId!),
    enabled: !!profileId,
  });

  const filteredDocuments = useMemo(() => {
    return documents.filter((doc) => {
      const matchesSearch =
        !searchQuery ||
        doc.filename.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.tags?.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
        doc.type.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesType = selectedType === 'all' || doc.type === selectedType;

      return matchesSearch && matchesType;
    });
  }, [documents, searchQuery, selectedType]);

  const recentDocuments = useMemo(() => {
    return [...documents].sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()).slice(0, 4);
  }, [documents]);

  const documentCount = documents.length;
  const storageUsed = documents.length * 2.4; // Simulated storage in MB

  if (profileStatus === 'pending' || documentsStatus === 'pending') {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-muted-foreground">Loading documents...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-8 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">My Documents</h1>
          <p className="text-muted-foreground">
            {documentCount} items · {storageUsed.toFixed(1)} MB used
          </p>
        </div>
        <Button>
          <PlusIcon className="mr-2 h-4 w-4" />
          Upload
        </Button>
      </div>

      {/* Search Bar and Type Filter */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <SearchIcon className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search documents..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10" />
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedType === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedType('all')}
          >
            All
          </Button>
          <Button
            variant={selectedType === 'id card' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedType('id card')}
          >
            ID Card
          </Button>
          <Button
            variant={selectedType === 'kk' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedType('kk')}
          >
            KK
          </Button>
          <Button
            variant={selectedType === 'passport' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedType('passport')}
          >
            Passport
          </Button>
          <Button
            variant={selectedType === 'certificate' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedType('certificate')}
          >
            Certificate
          </Button>
          <Button
            variant={selectedType === 'driving license' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedType('driving license')}
          >
            License
          </Button>
          <Button
            variant={selectedType === 'other' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedType('other')}
          >
            Other
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      {recentDocuments.length > 0 && (
        <div className="mb-8">
          <h2 className="mb-4 text-lg font-medium">Recent</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {recentDocuments.map((doc) => (
              <Card key={doc.id} className="group cursor-pointer transition-all hover:shadow-md">
                <CardContent className="p-4">
                  <div className="mb-3 flex items-start justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">{getFileIcon(doc.type as DocumentType)}</div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVerticalIcon className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Open</DropdownMenuItem>
                        <DropdownMenuItem>Download</DropdownMenuItem>
                        <DropdownMenuItem>Rename</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <div className="space-y-1">
                    <p className="truncate text-sm font-medium">{doc.filename}</p>
                    <div className="flex items-center gap-1">
                      <Badge variant="outline" className="text-xs">
                        {getDocumentTypeLabel(doc.type as DocumentType)}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{formatDate(doc.updatedAt)}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* View Toggle */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-medium">All Files</h2>
        <div className="flex gap-2">
          <Button variant={viewMode === 'grid' ? 'default' : 'outline'} size="icon" onClick={() => setViewMode('grid')}>
            <GridIcon className="h-4 w-4" />
          </Button>
          <Button variant={viewMode === 'list' ? 'default' : 'outline'} size="icon" onClick={() => setViewMode('list')}>
            <ListIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Documents Grid/List */}
      {filteredDocuments.length === 0 ? (
        <Card className="p-12 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
            <FileIcon className="h-8 w-8 text-muted-foreground" />
          </div>
          <CardTitle className="mb-2">No documents found</CardTitle>
          <CardDescription>{searchQuery ? 'Try adjusting your search query' : 'Upload your first document to get started'}</CardDescription>
        </Card>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredDocuments.map((doc) => (
            <Card key={doc.id} className="group cursor-pointer transition-all hover:shadow-md">
              <CardHeader className="p-4">
                <div className="mb-3 flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted">{getFileIcon(doc.type as DocumentType)}</div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100">
                        <MoreVerticalIcon className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Open</DropdownMenuItem>
                      <DropdownMenuItem>Download</DropdownMenuItem>
                      <DropdownMenuItem>Rename</DropdownMenuItem>
                      <DropdownMenuItem>Share</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <CardTitle className="truncate text-base">{doc.filename}</CardTitle>
                <CardDescription className="line-clamp-2">{doc.path}</CardDescription>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="flex flex-wrap gap-1">
                  <Badge variant="outline" className="text-xs">
                    {getDocumentTypeLabel(doc.type as DocumentType)}
                  </Badge>
                  {doc.tags?.slice(0, 2).map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {doc.tags && doc.tags.length > 2 && (
                    <Badge variant="secondary" className="text-xs">
                      +{doc.tags.length - 2}
                    </Badge>
                  )}
                </div>
                <p className="mt-2 text-xs text-muted-foreground">{formatDate(doc.updatedAt)}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <div className="divide-y">
            {filteredDocuments.map((doc) => (
              <div key={doc.id} className="flex items-center gap-4 p-4 transition-colors hover:bg-muted/50">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">{getFileIcon(doc.type as DocumentType)}</div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{doc.filename}</p>
                  <p className="truncate text-xs text-muted-foreground">{doc.path}</p>
                </div>
                <Badge variant="outline" className="text-xs whitespace-nowrap">
                  {getDocumentTypeLabel(doc.type as DocumentType)}
                </Badge>
                <div className="flex flex-wrap gap-1">
                  {doc.tags?.slice(0, 2).map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">{formatDate(doc.updatedAt)}</p>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVerticalIcon className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Open</DropdownMenuItem>
                    <DropdownMenuItem>Download</DropdownMenuItem>
                    <DropdownMenuItem>Rename</DropdownMenuItem>
                    <DropdownMenuItem>Share</DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}

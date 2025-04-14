
import { useEffect, useState, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Image, Calendar, Smile, Link as LinkIcon, X, Clock, Youtube } from "lucide-react";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

interface LinkPreviewData {
  url: string;
  title?: string;
  description?: string;
  image?: string;
  isVideo?: boolean;
}

const extractYouTubeVideoId = (url: string): string | null => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
};

interface CreatePostDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onPublish?: (postData: { content: string; linkPreview: LinkPreviewData | null }) => void;
}

const CreatePostDialog = ({ open, onOpenChange, onPublish }: CreatePostDialogProps) => {
  const [content, setContent] = useState("");
  const [linkPreview, setLinkPreview] = useState<LinkPreviewData | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Function to simulate fetching link preview data
  const generateLinkPreview = (text: string) => {
    // Extract URLs from text
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const urls = text.match(urlRegex);

    if (urls && urls.length > 0) {
      const url = urls[0];
      
      // Check if it's a YouTube URL
      const youtubeId = extractYouTubeVideoId(url);
      
      if (youtubeId) {
        setLinkPreview({
          url,
          title: "Video de YouTube",
          description: "Haz clic para reproducir este video",
          image: `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`,
          isVideo: true
        });
      } else if (isValidUrl(url)) {
        // For demo purposes, use placeholder data for non-YouTube URLs
        setLinkPreview({
          url,
          title: "Vista previa del enlace",
          description: "Descripción del contenido enlazado",
          image: "https://images.unsplash.com/photo-1483389127117-b6a2102724ae?q=80&w=1974&auto=format&fit=crop"
        });
      }
    } else {
      setLinkPreview(null);
    }
  };

  // Check for URLs when content changes
  useEffect(() => {
    if (content) {
      generateLinkPreview(content);
    } else {
      setLinkPreview(null);
    }
  }, [content]);

  // Auto focus the textarea when dialog opens
  useEffect(() => {
    if (open && textareaRef.current) {
      setTimeout(() => {
        textareaRef.current?.focus();
      }, 100);
    }
  }, [open]);

  const handlePublish = () => {
    if (!content.trim()) {
      toast.error("Por favor, escribe algo para publicar");
      return;
    }
    
    // Call the onPublish callback with the post data
    if (onPublish) {
      onPublish({
        content,
        linkPreview
      });
    }
    
    toast.success("Publicación creada con éxito");
    setContent("");
    setLinkPreview(null);
    onOpenChange(false);
  };

  const removeLinkPreview = () => {
    setLinkPreview(null);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader className="text-left">
          <DialogTitle className="text-xl pb-2">Crear publicación</DialogTitle>
        </DialogHeader>
        
        <div className="flex items-start gap-3 pt-2">
          <Avatar className="h-12 w-12">
            <AvatarImage src="https://images.unsplash.com/photo-1581092795360-fd1ca04f0952" alt="@usuario" />
            <AvatarFallback>US</AvatarFallback>
          </Avatar>
          
          <div>
            <h3 className="font-semibold text-md">José D'Angelo</h3>
            <p className="text-sm text-muted-foreground">Publicar para Cualquiera</p>
          </div>
        </div>

        <Textarea
          ref={textareaRef}
          placeholder="¿Sobre qué quieres hablar?"
          className="min-h-[120px] text-lg border-none shadow-none resize-none focus-visible:ring-0 p-0 my-4"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        {linkPreview && (
          <Card className="relative overflow-hidden mb-4 border shadow-sm">
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute top-2 right-2 bg-background/80 z-10"
              onClick={removeLinkPreview}
            >
              <X className="h-4 w-4" />
            </Button>
            
            {linkPreview.isVideo && linkPreview.image ? (
              <div>
                <div className="relative aspect-video w-full bg-muted">
                  <img 
                    src={linkPreview.image} 
                    alt={linkPreview.title || "Link preview"} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="rounded-full bg-black/70 w-16 h-16 flex items-center justify-center">
                      <Play className="h-8 w-8 text-white" fill="white" />
                    </div>
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="flex items-start">
                    <Youtube className="h-5 w-5 mr-3 text-red-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-base">{linkPreview.title}</h3>
                      <p className="text-muted-foreground text-sm">{linkPreview.description}</p>
                      <p className="text-blue-600 text-sm mt-1">{linkPreview.url}</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : linkPreview.image ? (
              <div>
                <div className="relative aspect-video w-full bg-muted">
                  <img 
                    src={linkPreview.image} 
                    alt={linkPreview.title || "Link preview"} 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="p-4">
                  <h3 className="font-medium line-clamp-2">{linkPreview.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{linkPreview.description}</p>
                  <p className="text-xs text-muted-foreground truncate mt-2">{linkPreview.url}</p>
                </div>
              </div>
            ) : (
              <div className="p-4">
                <h3 className="font-medium line-clamp-2">{linkPreview.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{linkPreview.description}</p>
                <p className="text-xs text-muted-foreground truncate mt-2">{linkPreview.url}</p>
              </div>
            )}
          </Card>
        )}

        <div className="flex justify-between items-center border-t pt-4">
          <div className="flex gap-1">
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
              <Image className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
              <Calendar className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
              <Smile className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
              <LinkIcon className="h-5 w-5" />
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="text-muted-foreground">
              <Clock className="mr-2 h-4 w-4" />
              Ahora
            </Button>
            <Button 
              onClick={handlePublish}
              disabled={!content.trim()}
              className="px-5"
            >
              Publicar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePostDialog;

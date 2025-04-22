import { useEffect, useState, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Image as ImageIcon, Calendar, Smile, Link as LinkIcon, X, Clock, Youtube, Play } from "lucide-react";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { format } from "date-fns";
import { YouTubeVideoDialog } from "./YouTubeVideoDialog";

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
  onPublish?: (postData: { content: string; linkPreview: LinkPreviewData | null; scheduledDate?: Date }) => void;
}

const emojis = [
  "👋", "👍", "😊", "🎉", "🔥", "❤️", "😂", "🙌", 
  "😀", "😃", "😄", "😁", "😆", "😅", "🤣", "😇",
  "😉", "😍", "🥰", "😘", "😋", "😎", "🤩", "🤔",
  "🤗", "🤭", "🙄", "😴", "😷", "🤕", "🥳", "😠"
];

const CreatePostDialog = ({ open, onOpenChange, onPublish }: CreatePostDialogProps) => {
  const [content, setContent] = useState("");
  const [linkPreview, setLinkPreview] = useState<LinkPreviewData | null>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [scheduledDate, setScheduledDate] = useState<Date | undefined>(undefined);
  const [scheduledTime, setScheduledTime] = useState<string>("00:00");
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showYouTubeDialog, setShowYouTubeDialog] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const generateLinkPreview = (text: string) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const urls = text.match(urlRegex);

    if (urls && urls.length > 0) {
      const url = urls[0];
      
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

  const handleEmojiClick = (emoji: string) => {
    setContent((prev) => prev + emoji);
    setShowEmojiPicker(false);
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setSelectedImage(e.target.result as string);
          setLinkPreview(null);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerImageUpload = () => {
    fileInputRef.current?.click();
  };

  const addLink = () => {
    if (linkUrl && isValidUrl(linkUrl)) {
      setContent((prev) => `${prev} ${linkUrl}`);
      setShowLinkInput(false);
      setLinkUrl("");
      generateLinkPreview(`${content} ${linkUrl}`);
    } else if (linkUrl) {
      toast.error("Por favor, ingresa una URL válida");
    }
  };

  const handlePublish = () => {
    if (!content.trim() && !selectedImage) {
      toast.error("Por favor, escribe algo o sube una imagen para publicar");
      return;
    }
    
    if (onPublish) {
      onPublish({
        content,
        linkPreview: selectedImage 
          ? { url: selectedImage, image: selectedImage } 
          : linkPreview,
        scheduledDate
      });
    }
    
    toast.success(scheduledDate 
      ? "Publicación programada con éxito" 
      : "Publicación creada con éxito");
    
    setContent("");
    setLinkPreview(null);
    setSelectedImage(null);
    setScheduledDate(undefined);
    setScheduledTime("00:00");
    setShowLinkInput(false);
    setLinkUrl("");
    onOpenChange(false);
  };

  const removeLinkPreview = () => {
    setLinkPreview(null);
  };

  const removeSelectedImage = () => {
    setSelectedImage(null);
  };

  const schedulePost = () => {
    if (scheduledDate && scheduledTime) {
      const [hours, minutes] = scheduledTime.split(":").map(Number);
      const date = new Date(scheduledDate);
      date.setHours(hours, minutes);
      setScheduledDate(date);
      toast.success(`Programado para ${format(date, "dd/MM/yyyy HH:mm")}`);
    }
  };

  const youtubeVideoId = linkPreview && linkPreview.isVideo
    ? extractYouTubeVideoId(linkPreview.url)
    : null;

  useEffect(() => {
    if (content) {
      generateLinkPreview(content);
    } else {
      setLinkPreview(null);
    }
  }, [content]);

  useEffect(() => {
    if (open && textareaRef.current) {
      setTimeout(() => {
        textareaRef.current?.focus();
      }, 100);
    }
  }, [open]);

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
            <p className="text-sm text-muted-foreground">
              {scheduledDate 
                ? `Programado para ${format(scheduledDate, "dd/MM/yyyy HH:mm")}`
                : "Publicar para Cualquiera"}
            </p>
          </div>
        </div>

        <Textarea
          ref={textareaRef}
          placeholder="¿Sobre qué quieres hablar?"
          className="min-h-[120px] text-lg border-none shadow-none resize-none focus-visible:ring-0 p-0 my-4"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <input 
          type="file" 
          ref={fileInputRef} 
          className="hidden" 
          accept="image/*" 
          onChange={handleImageUpload}
        />

        {showLinkInput && (
          <div className="flex items-center gap-2 mb-4 p-3 border rounded-md bg-background">
            <Input
              placeholder="Pegar enlace aquí"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              className="flex-grow"
            />
            <Button size="sm" onClick={addLink}>Añadir</Button>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setShowLinkInput(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}

        {selectedImage && (
          <Card className="relative overflow-hidden mb-4 border shadow-sm">
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute top-2 right-2 bg-background/80 z-10"
              onClick={removeSelectedImage}
            >
              <X className="h-4 w-4" />
            </Button>
            <div className="relative aspect-video w-full bg-muted">
              <img 
                src={selectedImage} 
                alt="Uploaded image" 
                className="w-full h-full object-cover"
              />
            </div>
          </Card>
        )}

        {linkPreview && !selectedImage && (
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
                    <button
                      type="button"
                      className="rounded-full bg-black/70 w-16 h-16 flex items-center justify-center shadow-lg hover:bg-black/80 transition"
                      onClick={() => setShowYouTubeDialog(true)}
                    >
                      <Play className="h-8 w-8 text-white" fill="white" />
                    </button>
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
                <YouTubeVideoDialog
                  open={showYouTubeDialog}
                  onOpenChange={setShowYouTubeDialog}
                  videoId={youtubeVideoId}
                />
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
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-muted-foreground hover:text-foreground"
              onClick={triggerImageUpload}
            >
              <ImageIcon className="h-5 w-5" />
            </Button>

            <Popover>
              <PopoverTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Calendar className="h-5 w-5" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <div className="p-3">
                  <h3 className="text-lg font-semibold mb-2">Programar publicación</h3>
                  <div className="space-y-2">
                    <div>
                      <p className="text-sm mb-1">Fecha</p>
                      <CalendarComponent
                        mode="single"
                        selected={scheduledDate}
                        onSelect={setScheduledDate}
                        initialFocus
                      />
                    </div>
                    <div>
                      <p className="text-sm mb-1">Hora</p>
                      <Input 
                        type="time" 
                        value={scheduledTime}
                        onChange={(e) => setScheduledTime(e.target.value)}
                      />
                    </div>
                    <Button onClick={schedulePost} className="w-full mt-2">
                      Programar
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            <Popover open={showEmojiPicker} onOpenChange={setShowEmojiPicker}>
              <PopoverTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Smile className="h-5 w-5" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[280px] p-0" align="start">
                <div className="p-3">
                  <h3 className="text-sm font-medium mb-2">Emojis</h3>
                  <div className="grid grid-cols-8 gap-2">
                    {emojis.map((emoji, index) => (
                      <button
                        key={index}
                        className="w-8 h-8 flex items-center justify-center text-lg hover:bg-muted rounded-md transition-colors"
                        onClick={() => handleEmojiClick(emoji)}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            <Button 
              variant="ghost" 
              size="icon" 
              className="text-muted-foreground hover:text-foreground"
              onClick={() => setShowLinkInput(true)}
            >
              <LinkIcon className="h-5 w-5" />
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-muted-foreground"
              disabled={!!scheduledDate}
            >
              <Clock className="mr-2 h-4 w-4" />
              {scheduledDate ? format(scheduledDate, "dd/MM HH:mm") : "Ahora"}
            </Button>
            <Button 
              onClick={handlePublish}
              disabled={!content.trim() && !selectedImage}
              className="px-5"
            >
              {scheduledDate ? "Programar" : "Publicar"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePostDialog;

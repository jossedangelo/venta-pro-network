
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface YouTubeVideoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  videoId: string | null;
}

export function YouTubeVideoDialog({ open, onOpenChange, videoId }: YouTubeVideoDialogProps) {
  if (!videoId) return null;
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl p-0 overflow-hidden">
        <div className="relative aspect-video w-full bg-black rounded-md">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            className="w-full h-full absolute inset-0 rounded-md"
            allow="autoplay; encrypted-media"
            allowFullScreen
            title="YouTube video player"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}

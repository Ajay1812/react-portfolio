import { useEffect } from "react";
import PropTypes from "prop-types";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export const Lightbox = ({ images, index, open, title, onClose, onNavigate }) => {
  const many = images.length > 1;
  const go = (delta) => onNavigate((index + delta + images.length) % images.length);

  useEffect(() => {
    if (!open || !many) return undefined;
    const onKey = (event) => {
      if (event.key === "ArrowRight") go(1);
      else if (event.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  if (!images.length) return null;

  return (
    <Dialog open={open} onOpenChange={(next) => !next && onClose()}>
      <DialogContent className="max-w-[min(92vw,1100px)] gap-3 p-3 sm:max-w-[min(92vw,1100px)]">
        <DialogTitle className="sr-only">{title} screenshots</DialogTitle>
        <DialogDescription className="sr-only">
          Screenshot {index + 1} of {images.length}
        </DialogDescription>
        <div className="relative flex items-center justify-center">
          <img
            src={images[index]}
            alt={`${title} screenshot ${index + 1}`}
            className="max-h-[78vh] w-full rounded object-contain"
          />
          {many ? (
            <>
              <Button
                variant="secondary"
                size="icon"
                className="absolute left-2 rounded-full"
                onClick={() => go(-1)}
                aria-label="Previous screenshot"
              >
                <ChevronLeft />
              </Button>
              <Button
                variant="secondary"
                size="icon"
                className="absolute right-2 rounded-full"
                onClick={() => go(1)}
                aria-label="Next screenshot"
              >
                <ChevronRight />
              </Button>
            </>
          ) : null}
        </div>
        {many ? (
          <p className="text-center font-mono text-[0.82rem] text-muted-foreground">
            {index + 1} / {images.length}
          </p>
        ) : null}
      </DialogContent>
    </Dialog>
  );
};

Lightbox.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  index: PropTypes.number.isRequired,
  open: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  onNavigate: PropTypes.func.isRequired,
};

import { useEffect, useRef } from "react";
import { Download, Printer } from "lucide-react";
import Modal from "../ui/Modal";
import Button from "../ui/Button";
import type { Product } from "../../types/product.types";

interface Props {
  product: Product;
  onClose: () => void;
}

export default function BarcodeModal({ product, onClose }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const renderBarcode = async () => {
      if (!canvasRef.current) return;
      const bwipjs = await import("bwip-js");
      bwipjs.toCanvas(canvasRef.current, {
        bcid: "code128",
        text: product.barcode,
        scale: 3,
        height: 12,
        includetext: true,
        textxalign: "center",
        textcolor: "ffffff",
        backgroundcolor: "1a1a1a",
      });
    };
    renderBarcode();
  }, [product.barcode]);

  const handleDownload = () => {
    if (!canvasRef.current) return;
    const link = document.createElement("a");
    link.download = `barcode-${product.name}.png`;
    link.href = canvasRef.current.toDataURL();
    link.click();
  };

  return (
    <Modal title="Barcode Generator" onClose={onClose}>
      <div className="flex flex-col items-center gap-4">
        <div className="bg-zinc-800 rounded-xl p-5 w-full flex flex-col items-center gap-3">
          <p className="text-white text-sm font-medium">{product.name}</p>
          <canvas ref={canvasRef} className="rounded" />
          <p className="text-zinc-500 text-xs tracking-widest">
            {product.barcode}
          </p>
        </div>
        <div className="flex gap-3 w-full">
          <Button variant="secondary" fullWidth onClick={handleDownload}>
            <Download size={15} className="mr-2" /> Download
          </Button>
          <Button fullWidth onClick={() => window.print()}>
            <Printer size={15} className="mr-2" /> Print
          </Button>
        </div>
      </div>
    </Modal>
  );
}

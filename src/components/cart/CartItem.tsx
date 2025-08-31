import { CartItem as CartItemType } from '@/lib/types';
import { Button } from '@/components/ui/Button';
import { formatPrice } from '@/lib/utils';
import Image from 'next/image';
import { Minus, Plus, Trash2 } from 'lucide-react';

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
}

export function CartItem({ item, onUpdateQuantity, onRemoveItem }: CartItemProps) {
  const { product, quantity } = item;
  const mainImage = product.images?.[0];
  const itemTotal = parseFloat(product.price) * quantity;

  return (
    <div className="flex items-center gap-4 border-b border-border pb-4">
      <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md">
        {mainImage ? (
          <Image
            src={mainImage.src}
            alt={mainImage.alt || product.name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-muted">
            <span className="text-xs text-muted-foreground">No image</span>
          </div>
        )}
      </div>

      <div className="flex-1">
        <h4 className="font-medium line-clamp-1">{product.name}</h4>
        <p className="text-sm text-muted-foreground">{formatPrice(product.price)} each</p>
        {item.variation && (
          <div className="mt-1">
            {item.variation.attributes.map((attr) => (
              <span key={attr.id} className="text-xs text-muted-foreground">
                {attr.name}: {attr.option}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => onUpdateQuantity(item.id, Math.max(0, quantity - 1))}
          disabled={quantity <= 1}
        >
          <Minus className="h-4 w-4" />
        </Button>
        
        <span className="w-8 text-center text-sm">{quantity}</span>
        
        <Button
          variant="outline"
          size="icon"
          onClick={() => onUpdateQuantity(item.id, quantity + 1)}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      <div className="text-right">
        <p className="font-medium">{formatPrice(itemTotal)}</p>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onRemoveItem(item.id)}
          className="text-destructive hover:text-destructive"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
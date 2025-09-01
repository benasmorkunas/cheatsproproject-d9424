import { Cart } from '@/lib/types';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card';
import { formatPrice } from '@/lib/utils';

interface CartSummaryProps {
  cart: Cart;
  onCheckout: () => void;
  loading?: boolean;
}

export function CartSummary({ cart, onCheckout, loading }: CartSummaryProps) {
  const { subtotal, tax, shipping, total, itemCount } = cart;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-3">
        <div className="flex justify-between text-sm">
          <span>Items ({itemCount})</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        
        {shipping > 0 && (
          <div className="flex justify-between text-sm">
            <span>Shipping</span>
            <span>{formatPrice(shipping)}</span>
          </div>
        )}
        
        {tax > 0 && (
          <div className="flex justify-between text-sm">
            <span>Tax</span>
            <span>{formatPrice(tax)}</span>
          </div>
        )}
        
        <div className="border-t border-border pt-3">
          <div className="flex justify-between font-medium">
            <span>Total</span>
            <span>{formatPrice(total)}</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter>
        <Button
          className="w-full"
          onClick={onCheckout}
          disabled={itemCount === 0 || loading}
        >
          {loading ? 'Processing...' : 'Proceed to Checkout'}
        </Button>
      </CardFooter>
    </Card>
  );
}
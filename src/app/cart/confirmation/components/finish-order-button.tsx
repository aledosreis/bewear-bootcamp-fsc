"use client";

import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { useFinishOrder } from "@/hooks/mutations/use-finish-order";

const FinishOrderButton = () => {
  const [isSuccessDialogIsOpen, setIsSuccessDialogIsOpen] = useState(true);
  const finishOrderMutation = useFinishOrder();
  return (
    <>
      <Button
        className="w-full rounded-full"
        size="lg"
        onClick={() => finishOrderMutation.mutate()}
        disabled={finishOrderMutation.isPending}
      >
        {finishOrderMutation.isPending && (
          <Loader2 className="h-4 w-4 animate-spin" />
        )}
        Finalizar compra
      </Button>

      <Dialog
        open={isSuccessDialogIsOpen}
        onOpenChange={setIsSuccessDialogIsOpen}
      >
        <DialogContent className="text-center">
          <Image
            src="/illustration.svg"
            alt="success"
            width={300}
            height={300}
            className="mx-auto"
          />
          <DialogTitle className="mt-4 text-2xl">Pedido efetuado!</DialogTitle>
          <DialogDescription className="font-medium">
            Seu pedido foi efetuado com sucesso. Você pode acompanhar o status
            na seção de “Meus Pedidos”.
          </DialogDescription>
          <DialogFooter>
            <Button className="rounded-full" size="lg">
              Ver meus pedidos
            </Button>
            <Button className="rounded-full" size="lg" variant="outline">
              Voltar para a loja
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FinishOrderButton;

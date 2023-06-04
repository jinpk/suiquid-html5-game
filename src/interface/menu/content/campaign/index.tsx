import { useWallet } from "@suiet/wallet-kit";
import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { SMART_CONTRACT_ADDRESS, suiProvider } from "~lib/contract";
import { StyledForm } from "./styles";
import { Ed25519Keypair, RawSigner, TransactionBlock } from "@mysten/sui.js";

interface CreateAd {
  url: string;
  title: string;
  funds: number;
}

const defaultValues: CreateAd = {
  url: "",
  title: "",
  funds: 0,
};

const tx = new TransactionBlock();
const keypair = new Ed25519Keypair();
const signer = new RawSigner(keypair, suiProvider);

export default function Campaign() {
  const wallet = useWallet();
  const form = useForm({
    defaultValues,
  });

  const handleSubmit = useCallback(
    async (data: CreateAd) => {
      if (!wallet.connected) {
        return alert(
          "You are not connected to your wallet. Please connect your wallet."
        );
      }
      try {
        const txResult = await tx.moveCall({
          target: `0x0b5b616545b3b86f2375f10b8d712acae91dc57dec5a5f8a293d3b42319b58e9::suiquid::add_ad`,
          arguments: [
            tx.pure(
              "0x0b5b616545b3b86f2375f10b8d712acae91dc57dec5a5f8a293d3b42319b58e9"
            ),
            tx.pure(data.title),
            tx.pure(data.url),
            tx.pure("READY"),
            tx.pure(data.funds),
          ],
        });

        const result = await signer.signAndExecuteTransactionBlock({
          transactionBlock: tx,
        });

        console.log({ result });

        form.reset();
      } catch (error: any) {
        alert(error.message || error);
      }
    },
    [wallet]
  );

  return (
    <StyledForm onSubmit={form.handleSubmit(handleSubmit)}>
      <label className="title">Promote your brand :)</label>
      <span className="input-label">Your brand</span>
      <input {...form.register("title")} />
      <span className="input-label">What do you want promote?</span>
      <input {...form.register("url")} />
      <span className="input-label">Sponsorship funds</span>
      <input {...form.register("funds")} type="number" />
      <button>Confirm</button>
    </StyledForm>
  );
}

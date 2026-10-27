import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";
import PublicCardView from "@/components/progress-cards/PublicCardView";
import { ProgressCardRecord, ProgressCardFrozenData } from "@/lib/progress-cards/types";
import { SITE_CONFIG } from "@/lib/config/site";

interface PageProps {
  params: {
    id: string;
  };
}

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const cardId = params.id;
  const supabaseAdmin = createAdminClient();

  const { data: card } = await supabaseAdmin
    .from("progress_cards")
    .select("*")
    .eq("id", cardId)
    .eq("is_public", true)
    .maybeSingle();

  if (!card) {
    return {
      title: "Progress Card Not Found | CUETMate",
      description: "This progress card is private or does not exist.",
    };
  }

  const cardData = card.card_json as ProgressCardFrozenData;
  const displayName = card.display_name || cardData.displayName || "CUET Aspirant";
  const title = `${displayName}'s ${cardData.subject} Score Gain | CUET UG 2027`;
  const description = `${cardData.subject}: ${cardData.fromAccuracy}% → ${cardData.toAccuracy}% (${
    cardData.showAccuracyGain ? `+${cardData.accuracyDelta}% gain` : "Verified topic growth"
  }). Prepared with CUETMate AI Learning Coach.`;
  const imageUrl = `${SITE_CONFIG.url}/r/${cardId}/image?og=1`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `${SITE_CONFIG.url}/r/${cardId}`,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

export default async function PublicProgressCardPage({ params }: PageProps) {
  const cardId = params.id;
  const supabaseAdmin = createAdminClient();

  const { data: card, error } = await supabaseAdmin
    .from("progress_cards")
    .select("*")
    .eq("id", cardId)
    .eq("is_public", true)
    .maybeSingle();

  if (error || !card) {
    notFound();
  }

  return <PublicCardView card={card as ProgressCardRecord} />;
}

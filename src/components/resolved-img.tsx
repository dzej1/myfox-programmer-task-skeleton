import { useEffect, useState } from "react";
import { styled } from "styled-components";

const Image = styled.img`
  width: 84px;
  height: 84px;
  border-radius: 8px;
  object-fit: cover;
`;

export const ResolvedImage = ({
  secret,
  fallback: FallbackComponent,
}: {
  secret?: string;
  fallback: any;
}) => {
  const [imgUrl, setImgUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!secret) return;

    const controller = new AbortController();

    async function loadImage() {
      try {
        const res = await fetch("https://api.myfox.cz/test/photo/" + secret, {
          signal: controller.signal,
        });

        setImgUrl(await res.text());
      } catch (e: any) {
        if (e.name !== "AbortError") {
          console.error(e);
        }
      }
    }

    loadImage();

    return () => controller.abort();
  }, [secret]);

  if (imgUrl) {
    return <Image src={imgUrl} />;
  }

  return <FallbackComponent />;
}

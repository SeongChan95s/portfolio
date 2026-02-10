import { logger } from "firebase-functions";
import { onCall, HttpsError } from "firebase-functions/v2/https";

export const velogRssProxy = onCall(async request => {
  try {
    const username = request.data.username;

    if (!username) {
      throw new HttpsError("invalid-argument", "유저 이름이 필수입니다.");
    }

    const velogResponse = await fetch(`https://v2.velog.io/rss/@${username}`);

    if (!velogResponse.ok) {
      throw new HttpsError("internal", "Velog로부터 RSS를 받아오지 못했습니다.");
    }

    const xmlText = await velogResponse.text();
    return xmlText;
  } catch (error) {
    logger.error(error);
    if (error instanceof HttpsError) {
      throw error;
    }
    throw new HttpsError("internal", `원인을 알 수 없는 서버 에러 발생: ${error}`);
  }
});

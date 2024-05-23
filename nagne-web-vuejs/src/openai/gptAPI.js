import OpenAI from "openai";

// chatGPT description
const getGPTResponse = async (myAttractions, ) => {
  try {
    const openai = new OpenAI({
      apiKey: `${import.meta.env.VITE_OPENAI_API_KEY}`,
      dangerouslyAllowBrowser: true,
    });

    const prompt = `${JSON.stringify(myAttractions)}라는 관광지 데이터를 보아놓은 정보가 있어.
    난 이 데이터로 여행을 떠나고 싶은데 어떤 여행지를 먼저 가면 좋을지, 첫 번째 여행지를 다녀온 후 이후의 여행지로는 어딜가면 좋을지 궁금해.
    내가 준 데이터에서 위도와 경도 좌표를 추출해서 합리적인 여행 계획을 세워줘. 대략적인 소요 시간과 이동 거리도 첨가해서 답변해줘.`;

    const response = await openai.chat.completions.create({
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "gpt-3.5-turbo",
    });
    return response.choices[0].message.content;
  } catch (error) {
    console.log("chatGPT: 🚨 에러가 발생했습니다.");
  }
};

export {getGPTResponse};
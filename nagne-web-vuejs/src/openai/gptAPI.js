import OpenAI from "openai";

// chatGPT description
const getGPTResponse = async () => {
  try {
    const openai = new OpenAI({
      apiKey: `${import.meta.env.VITE_OPENAI_API_KEY}`,
      dangerouslyAllowBrowser: true,
    });

    const prompt = `${entity.value.roadAddr}라는 주소와 연결된 데이터에 ${JSON.stringify(
      entity.value
    )}란 정보가 있는데 이 정보를 중심으로 주소를 100자 정도로 설명해줘.`;

    const response = await openai.chat.completions.create({
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "gpt-3.5-turbo",
    });
    console.log("chatGPT 결과: ", response.choices[0].message.content);
  } catch (error) {
    console.log("chatGPT: 🚨 에러가 발생했습니다.");
  }
};

import { Input } from "@/components/ui/input"
import { Button } from "./components/ui/button";

import arrow from './assets/right-arrow.png'

import "./App.css";
import { useState } from "react";
import { useConversation } from "./store/useConversation";

function App() {
  const [prompt, setPrompt] = useState('')
  const { conversation, askQuestion, updateAnswer } = useConversation()


  const handleSubmit = () => {
    askQuestion(prompt)
    const sse = new EventSource(`http://43.205.132.12/generate-text?prompt=${prompt}`, { withCredentials: true });
    function getRealtimeData({ data }: { data: string }) {

      updateAnswer(data)
    }
    sse.onopen = () => console.log(">>> Connection opened!");
    sse.onmessage = e => getRealtimeData(e);
    sse.onerror = () => {
      sse.close();
    }
  }

  const Request = ({ message }: { message: string }) => {
    return <div className="">
      <h5 className="text-lg font-bold">
        You
      </h5>

      <div>
        {message}
      </div>
    </div>
  }

  const Response = ({ message }: { message: string }) => {
    return <div className="">
      <h5 className="text-lg font-bold">
        Response
      </h5>

      <div>
        {message}
      </div>
    </div>
  }

  return (
    <div className="bg-gray-100 h-screen w-full p-8">
      <div className="flex flex-col justify-between h-full">
        <div>

          {
            conversation.question != "" && <Request message={conversation.question} />
          }
          {
            conversation.answer != "" && <Response message={conversation.answer} />
          }


        </div>
        <div className="flex w-full max-w-5xl mx-auto gap-4">
          <Input onChange={(e) => setPrompt(e.target.value)} placeholder="What do you want to know today?" />
          <Button onClick={handleSubmit}><img src={arrow} className="h-4 w-4" /></Button>
        </div>
      </div>
    </div>
  );
}

export default App;

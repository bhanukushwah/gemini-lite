import { create } from 'zustand';

interface ConversationState {
    conversation: {
        question: string;
        answer: string;
    };
    askQuestion: (message: string) => void;
    updateAnswer: (message: string) => void;
}

export const useConversation = create<ConversationState>((set) => ({
    conversation: {
        question: "",
        answer: "",
    },
    askQuestion: (message: string) =>
        set(() => ({
            conversation: {
                question: message,
                answer: ""
            },
        })),
    updateAnswer: (message: string) =>
        set((state) => ({
            conversation: {
                ...state.conversation,
                answer: state.conversation.answer + message,
            },
        })),
}));

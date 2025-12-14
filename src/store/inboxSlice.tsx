import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Message {
  id: number;
  text: string;
  sender: "me" | "other";
}

export interface Profile {
  name: string;
  specialization: string;
  phone: string;
  email: string;
}

export interface Conversation {
  id: string;
  name: string;
  type:string;
  latest: string;
  time: string;
  profile: Profile;
  messages: Message[];
}

export interface InboxState {
  conversations: Conversation[];
  selectedConversationId: string;
  selectedTab:string;
}

const initialState: InboxState = {
  conversations: [
    {
      id: 'Doctors1',
      type:'Doctors',
      name: "Dr. Michael",
      latest: "I'll review and share…",
      time: "12m",
      profile: {
        name: "Dr. Michael",
        specialization: "Cardiologist",
        phone: "+91 9895 082 028",
        email: "sarah_johnson@email.com",
      },
      messages: [
        { id: 1, text: "Hi Dr. David, I'd like your opinion…", sender: "other" },
        { id: 2, text: "Sure, can you share the MRI report?", sender: "me" },
        { id: 3, text: "I’ll review and share my notes.", sender: "me" },
      ],
    },
     {
      id: 'Patients2',
      type:'Patients',
      name: "Patient David",
      latest: "I'll review and share…",
      time: "12m",
      profile: {
        name: "Patient David",
        specialization: "Cardiologist",
        phone: "+91 9895 082 028",
        email: "sarah_johnson@email.com",
      },
      messages: [
        { id: 1, text: "Hi Patient David, I'd like your opinion…", sender: "other" },
        { id: 2, text: "Sure, can you share the MRI report?", sender: "me" },
        { id: 3, text: "I’ll review and share my notes.", sender: "me" },
      ],
    },
     {
      id: 'Doctors2',
      type:'Doctors',
      name: "Dr. Reddy",
      latest: "I'll review and share…",
      time: "12m",
      profile: {
        name: "Dr. Reddy",
        specialization: "Cardiologist",
        phone: "+91 9895 082 028",
        email: "sarah_johnson@email.com",
      },
      messages: [
        { id: 1, text: "Hi Dr. Reddy, I'd like your opinion…", sender: "other" },
        { id: 2, text: "Sure, can you share the MRI report?", sender: "me" },
        { id: 3, text: "I’ll review and share my notes.", sender: "me" },
      ],
    },
     {
      id: 'Patients1',
      type:'Patients',
      name: "Patient Reddy",
      latest: "I'll review and share…",
      time: "12m",
      profile: {
        name: "Patient Reddy",
        specialization: "Cardiologist",
        phone: "+91 9895 082 028",
        email: "sarah_johnson@email.com",
      },
      messages: [
        { id: 1, text: "Hi Patient Reddy, I'd like your opinion…", sender: "other" },
        { id: 2, text: "Sure, can you share the MRI report?", sender: "me" },
        { id: 3, text: "I’ll review and share my notes.", sender: "me" },
      ],
    },
  ],
  selectedConversationId: 'Patients1',
  selectedTab:'Patients'
};

const inboxSlice = createSlice({
  name: "inbox",
  initialState,
  reducers: {
    selectConversation: (state, action: PayloadAction<string>) => {
      state.selectedConversationId = action.payload;
    },

    sendMessage: (state, action: PayloadAction<string>) => {
      const conversation = state.conversations.find(
        (c) => c.id === state.selectedConversationId
      );

      if (conversation) {
        conversation.messages.push({
          id: Date.now(),
          text: action.payload,
          sender: "me",
        });
        conversation.latest = action.payload;
        conversation.time = "now";
      }
    },
    selectUserTab:(state,action:PayloadAction<string>)=>{
      state.selectedTab=action.payload;
    }
  },
});



export const { selectConversation, sendMessage, selectUserTab } = inboxSlice.actions;

export default inboxSlice.reducer;

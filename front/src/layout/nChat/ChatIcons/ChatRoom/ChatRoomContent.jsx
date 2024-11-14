import React, { useRef, useEffect, useState } from "react";
import { AiOutlineSend } from "react-icons/ai";
import ChatMessages from "./ChatMessages";

const ChatRoomContent = ({ loginId, recipientId, nc, channel }) => {
  const messagesEndRef = useRef(null);
  const [message, setMessage] = useState("");
  const [channalId, setChannalId] = useState("");
  const [updateMessage, setUpdateMessage] = useState([]);
  const [friendState, setFriendState] = useState(null);

  // 채팅 내용이 갱신될 때 자동으로 스크롤을 맨 아래로 내리기 위한 함수
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // 컴포넌트가 마운트되거나 메시지가 업데이트 될 때마다 자동으로 스크롤 내리기
  useEffect(() => {
    // console.log(messages);
    scrollToBottom();
    console.log(recipientId);
    // setUpdateMessage(messages);
  }, [channel]); // 채팅 메시지가 바뀔 때마다 호출되도록 할 수도 있음


  const handleMessage = (e) => {
    setMessage(e.target.value);
  }

  const createChannal = async () => {
    try {
      console.log(`${loginId}_${recipientId}`);

      const response = await nc.createChannel({
        type: "PRIVATE",
        name: `${loginId}_${recipientId}`,
        members: [loginId, recipientId]
        // customField: [CustomField]
      });

      if (response) {
        console.log("Channel created successfully:", response);
        setChannalId(response.id); // 상태 업데이트
        return response.id; // 채널 ID 반환
      }
    } catch (error) {
      console.error("Error creating channel:", error);
    }
    return null;
  };

  const subscribeChannel = async (channelId) => {
    try {

      const response = await nc.subscribe(channelId, { "language": "kr" });

      if (response) {
        console.log("Message sent successfully:", response);
        // 성공적으로 메시지가 전송되었을 때 후속 작업
      }
      sendMessage(channelId);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  }

  // const sendMessage = async (channelId) => {
  //   try {
  //     console.log("Sending message:", message);

  //     const response = await nc.sendMessage(channelId, {
  //       type: "text",
  //       message: message,
  //     });

  //     if (response) {
  //       console.log("Message sent successfully:", response);
  //       setMessage(""); // 입력창 초기화
  //       // await getMessages(channelId);
  //     }
  //   } catch (error) {
  //     console.error("Error sending message:", error);
  //   }

  // };

  const sendMessage = async (channelId) => {
    try {
      console.log("Sending message:", message);

      const response = await nc.sendMessage(channelId, {
        type: "text",
        message: message,
      });

      if (response) {
        console.log("Message sent successfully:", response);

        // 기존 messages에 새 메시지 추가하여 실시간 반영
        setUpdateMessage((prevMessages) => [
          ...prevMessages,
          { node: response },
        ]);

        setMessage(""); // 입력창 초기화
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  // 초기 로드 시 모든 메시지를 가져오기
  const getMessages = async (channelId) => {
    const filter = { channel_id: channelId };
    const sort = { created_at: 1 };
    const option = { offset: 0, per_page: 100 };
    try {
      const response = await nc.getMessages(filter, sort, option);
      setUpdateMessage(response.edges); // 메시지 초기 로드
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  // 최초 로딩 시 getMessages 호출
  useEffect(() => {
    if (channel) {
      getMessages(channel.id);
    }
  }, [channalId]);

  const requestFriend = async () => {
    try {
      const response = await nc.requestFriend(recipientId);
      console.log(response);
      setFriendState("requested");
    } catch (error) {
      console.error(error);
    }
  }

  const getFriendships = async () => {
    console.log(recipientId);
    const filter = { user_id: loginId, friend_id: recipientId }; // pending: 대기 중
    const sort = { created_at: -1 };
    const option = { offset: 0, limit: 100 };
    try {
      const friends = await nc.getFriendships(filter, sort, option);
      console.log(friends.edges[0].node.status);
      setFriendState(friends.edges[0].node.status);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getFriendships();
  }, [loginId, recipientId])

  const acceptFriend = async () => {
    console.log(recipientId);
    try {
      const response = await nc.acceptFriend(recipientId);
      console.log(response);
      setFriendState("accepted");
    } catch (error) {
      console.error(error);
    }
  }
  const rejectFriend = async () => {
    console.log(recipientId);
    try {
      const response = await nc.rejectFriend(recipientId);
      console.log(response);
      setFriendState("rejected");
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (updateMessage?.length > 0) {
      scrollToBottom();
    }
  }, [updateMessage]);

 
  

  const clickSendBtn = async () => {
    
    let channelId = channalId;
    if (friendState == null) {
      if (!channelId) {
        channelId = await createChannal();
        setChannalId(channelId);  // 새로 생성한 채널 ID 상태 업데이트
      }

      if (channelId) {
        await subscribeChannel(channelId);
        await requestFriend();
      }
    } else {
      sendMessage(channel.id);
      console.log(channel);
      console.log(updateMessage);
    }
  };


  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      {/* 채팅 메시지 영역 */}
      <div
        style={{
          // flex: 1,
          padding: "10px",
          overflowY: "auto",  // 내용이 많으면 스크롤이 생김
          height: '400px'
        }}
      >
        {/* Mock messages here; replace with real messages */}
        <ChatMessages messages={updateMessage} loginId={loginId} nc={nc} />


        {/* 스크롤을 아래로 내리기 위한 ref */}
        <div ref={messagesEndRef} />

      </div>

      {/* 채팅 입력 및 전송 버튼 */}
      {
        friendState === "accepted" || friendState == null ? (
          // 친구 관계가 수락된 경우 채팅 입력창 표시
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "10px",
              backgroundColor: "#fff",
              borderTop: "1px solid #ddd",
              position: 'absolute',
              bottom: 0,
              flexShrink: 0,
              zIndex: 10,
              width: '100%'
            }}
          >
            <input
              type="text"
              placeholder="Type a message..."
              style={{
                flex: 1,
                padding: "8px",
                borderRadius: "20px",
                border: "1px solid #ddd",
                marginRight: "10px",
              }}
              value={message}
              onChange={handleMessage}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  clickSendBtn();
                }
              }}
            />
            <button
              style={{
                padding: "8px 12px",
                borderRadius: "20px",
                backgroundColor: "#4CAF50",
                color: "white",
                border: "none",
                cursor: "pointer",
              }}
              onClick={clickSendBtn}
            >
              <AiOutlineSend size={20} />
            </button>
          </div>

        ) : friendState === "requested" || friendState === "pending" ? (

          channel?.last_message.sender.id === loginId ?
            <div>상대방이 친구요청을 수락하면 채팅이 가능합니다.</div>
            :
            // 친구 요청이 수락되지 않은 경우, 수락/거절 버튼 표시
            <div align="center">
              <span>친구 신청이 왔습니다.</span>
              <br />
              <button onClick={acceptFriend}>수락</button>
              <button onClick={rejectFriend}>거절</button>
            </div>
        ) :
          channel?.last_message.sender.id === loginId ?
            <div>상대방이 친구요청을 수락하면 채팅이 가능합니다.</div> :
            <div>친구신청을 거절했습니다.</div>



      }
    </div>
  );
};

export default ChatRoomContent;
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Send, User, MessageSquare, Brain, Sparkles, Lightbulb, Target, BarChart3, ArrowRight } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function MessagesPage() {
  const [chatMessages, setChatMessages] = useState([
    {
      id: "1",
      sender: "John Smith",
      avatar: "/avatars/john.png",
      content: "Hi, I have a question about the math assignment.",
      timestamp: "10:30 AM",
      unread: true,
    },
    {
      id: "2",
      sender: "Sarah Johnson",
      avatar: "/avatars/sarah.png",
      content: "The science project deadline has been extended to next week.",
      timestamp: "Yesterday",
      unread: false,
    },
    {
      id: "3",
      sender: "Mr. Thompson",
      avatar: "/avatars/thompson.png",
      content: "Great work on your history presentation!",
      timestamp: "2 days ago",
      unread: false,
    },
  ])

  const [aiMessages] = useState([
    {
      id: "msg1",
      sender: "Math AI Tutor",
      subject: "Integration Practice Results",
      preview: "Your accuracy on integration by parts improved to 85%. Let's focus on these specific problem types...",
      time: "2 hours ago",
      type: "performance",
      details: "Based on your recent practice, I've noticed you're excelling at basic integration but could use more practice with trigonometric substitutions. Here's a personalized study plan for the next week.",
      action: "View Study Plan",
    },
    {
      id: "msg2",
      sender: "Study Analytics",
      subject: "Weekly Progress Report",
      preview: "You've completed 12 practice problems and 3 mock quizzes. Here's your personalized study plan for next week...",
      time: "5 hours ago",
      type: "insight",
      details: "Your study efficiency has increased by 15% this week! The new spaced repetition schedule is working well. Keep up the momentum with these recommended topics.",
      action: "View Recommendations",
    },
  ])

  const [selectedMessage, setSelectedMessage] = useState(chatMessages[0])
  const [newMessage, setNewMessage] = useState("")

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const updatedMessages = chatMessages.map((msg) =>
        msg.id === selectedMessage.id
          ? {
              ...msg,
              messages: [
                ...(msg.messages || []),
                { content: newMessage, timestamp: new Date().toLocaleTimeString(), sent: true },
              ],
            }
          : msg
      )
      setChatMessages(updatedMessages)
      setNewMessage("")
    }
  }

  const getMessageTypeColor = (type: string) => {
    switch (type) {
      case "performance":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
      case "insight":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400"
      case "feedback":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
      case "review":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400"
    }
  }

  return (
    <div className="flex flex-col h-full w-full">
      <div className="container px-4 md:px-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Input placeholder="Search messages..." className="w-[300px] lg:w-[400px] xl:w-[500px]" />
            <Button variant="outline" size="icon">
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="container px-4 md:px-6 flex-1">
        <Tabs defaultValue="chat" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="chat">Chat</TabsTrigger>
            <TabsTrigger value="ai">AI Tutors</TabsTrigger>
          </TabsList>

          <TabsContent value="chat" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <Card className="lg:col-span-4">
                <CardContent className="space-y-2 p-6">
                  {chatMessages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-accent ${
                        selectedMessage.id === message.id ? "bg-accent" : ""
                      }`}
                      onClick={() => setSelectedMessage(message)}
                    >
                      <Avatar>
                        <AvatarImage src={message.avatar} />
                        <AvatarFallback>
                          <User className="h-5 w-5" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <p className="font-medium truncate">{message.sender}</p>
                          <span className="text-xs text-muted-foreground whitespace-nowrap">{message.timestamp}</span>
                        </div>
                        <p className="text-sm text-muted-foreground truncate">{message.content}</p>
                      </div>
                      {message.unread && <Badge className="ml-2 shrink-0">New</Badge>}
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="lg:col-span-8 flex flex-col">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src={selectedMessage.avatar} />
                      <AvatarFallback>
                        <User className="h-5 w-5" />
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle>{selectedMessage.sender}</CardTitle>
                      <CardDescription>Last seen recently</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 space-y-4 overflow-y-auto">
                  <div className="flex items-start gap-4">
                    <Avatar>
                      <AvatarImage src={selectedMessage.avatar} />
                      <AvatarFallback>
                        <User className="h-5 w-5" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="bg-accent p-3 rounded-lg">
                      <p>{selectedMessage.content}</p>
                      <p className="text-xs text-muted-foreground mt-1">{selectedMessage.timestamp}</p>
                    </div>
                  </div>
                  {selectedMessage.messages?.map((msg, index) => (
                    <div
                      key={index}
                      className={`flex items-start gap-4 ${msg.sent ? "justify-end" : ""}`}
                    >
                      {!msg.sent && (
                        <Avatar>
                          <AvatarImage src={selectedMessage.avatar} />
                          <AvatarFallback>
                            <User className="h-5 w-5" />
                          </AvatarFallback>
                        </Avatar>
                      )}
                      <div
                        className={`p-3 rounded-lg ${
                          msg.sent ? "bg-primary text-primary-foreground" : "bg-accent"
                        }`}
                      >
                        <p>{msg.content}</p>
                        <p className="text-xs text-muted-foreground mt-1">{msg.timestamp}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
                <div className="p-4 border-t">
                  <div className="flex items-center gap-2">
                    <Input
                      placeholder="Type a message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                    />
                    <Button onClick={handleSendMessage}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="ai" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full">
              <Card className="lg:col-span-12 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 p-6 w-full">
                  {aiMessages.map((message) => (
                    <Card key={message.id} className="w-full">
                      <CardContent className="p-6">
                        <div className="flex flex-col space-y-4 h-full">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-3">
                              <div className={`p-2 rounded-full ${getMessageTypeColor(message.type)}`}>
                                {message.type === "performance" && <BarChart3 className="h-5 w-5" />}
                                {message.type === "insight" && <Lightbulb className="h-5 w-5" />}
                                {message.type === "feedback" && <MessageSquare className="h-5 w-5" />}
                                {message.type === "review" && <Target className="h-5 w-5" />}
                              </div>
                              <div>
                                <h3 className="font-medium">{message.sender}</h3>
                                <p className="text-sm text-muted-foreground">{message.time}</p>
                              </div>
                            </div>
                            <Badge variant="outline" className={getMessageTypeColor(message.type)}>
                              {message.type.charAt(0).toUpperCase() + message.type.slice(1)}
                            </Badge>
                          </div>
                          
                          <div className="space-y-2 flex-grow">
                            <h4 className="font-medium">{message.subject}</h4>
                            <p className="text-muted-foreground">{message.details}</p>
                          </div>

                          <div className="flex justify-end mt-auto">
                            <Button variant="outline" size="sm">
                              {message.action}
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
} 
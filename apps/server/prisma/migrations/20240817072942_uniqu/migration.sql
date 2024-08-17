-- DropIndex
DROP INDEX "Message_senderId_chatId_key";

-- CreateIndex
CREATE INDEX "Message_senderId_idx" ON "Message"("senderId");

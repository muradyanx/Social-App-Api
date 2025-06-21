import { Inject, Injectable } from '@nestjs/common';
import { Pool } from 'pg';
import { RequestAction, RequestStatus } from '@common/enum/request-status.enum';

@Injectable()
export class FriendRepository {
  constructor(@Inject('PG_CLIENT') private readonly pgClient: Pool) {}

  async saveRequest(sender, receiver) {
    const query = `INSERT INTO friend_requests (sender_id, receiver_id, status, sent_at) VALUES ($1, $2, $3, $4)`;
    return await this.pgClient.query(query, [
      sender,
      receiver,
      RequestStatus.PENDING,
      new Date(),
    ]);
  }
  async getRequestByReceiverId(receiverId: number) {
    const query = `SELECT id FROM friend_requests WHERE receiver_id = $1`;
    const request = await this.pgClient.query(query, [receiverId]);
    return request.rows[0];
  }

  async getRequestsList(userId: number) {
    const query = `SELECT * FROM friend_requests WHERE receiver_id = $1`;
    const request = await this.pgClient.query(query, [userId]);
    return request.rows;
  }

  async getRequestByIdAndReceriver(requestId: number, receiverId: number) {
    const query = `SELECT * FROM friend_requests WHERE id = $1 AND receiver_id = $2 AND status = $3`;
    const request = await this.pgClient.query(query, [
      requestId,
      receiverId,
      RequestStatus.PENDING,
    ]);
    return request.rows[0];
  }

  async updateRequestStatus(id: number, status: RequestAction) {
    const query = `UPDATE friend_requests SET status = $1 WHERE id = $2`;
    return await this.pgClient.query(query, [status, id]);
  }

  async updateFriends(receiver: number, sender: number) {
    const query = `INSERT INTO friends (user_id, friend_id, added_at) VALUES ($1, $2, $3)`;
    return await this.pgClient.query(query, [receiver, sender, new Date()]);
  }
}

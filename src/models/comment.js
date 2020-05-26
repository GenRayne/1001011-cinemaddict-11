export default class Comment {
  constructor(data) {
    this.id = data.id;
    this.username = data.author;
    this.emoji = data.emotion;
    this.message = data.comment;
    this.date = new Date(data.date);
  }

  static parseComment(data) {
    return new Comment(data);
  }

  static parseComments(comments) {
    return comments.map(Comment.parseComment);
  }

  static parseUpdatedComments(data) {
    const {comments} = data;
    return comments.map(Comment.parseComment);
  }

  toRAW() {
    return {
      'id': this.id,
      'author': this.username,
      'comment': this.message,
      'date': this.date,
      'emotion': this.emoji,
    };
  }

  static clone(data) {
    return new Comment(data.toRAW());
  }
}

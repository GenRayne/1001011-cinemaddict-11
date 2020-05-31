export default class Comment {
  constructor(comment) {
    this.id = comment.id;
    this.username = comment.author;
    this.emoji = comment.emotion;
    this.message = comment.comment;
    this.date = new Date(comment.date);
  }

  static parseComment(comment) {
    return new Comment(comment);
  }

  static parseComments(comments) {
    return comments.map(Comment.parseComment);
  }

  static parseUpdatedComments(movieData) {
    const {comments} = movieData;
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

  static clone(comment) {
    return new Comment(comment.toRAW());
  }
}

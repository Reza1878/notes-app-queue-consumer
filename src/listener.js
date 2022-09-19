class Listener {
  constructor(notesService, mailSender) {
    this._notesService = notesService;
    this._mailSender = mailSender;

    this.listen = this.listen.bind(this);
  }

  async listen(message) {
    try {
      const { userId, targetEmail } = JSON.parse(message.content.toString());
      const notes = await this._notesService.getNotes(userId);
      const result = await this._mailSender.sendEmail(
        targetEmail,
        JSON.stringify(notes),
      );
      // eslint-disable-next-line no-console
      console.log(result);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }
}

module.exports = Listener;

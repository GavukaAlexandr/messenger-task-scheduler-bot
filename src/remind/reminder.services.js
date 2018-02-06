import Reminder from "./reminder.schema";

class ReminderService {
  findAll(cb) {
    Reminder.find(reminder)
      .then(reminder => cb(null, reminder))
      .catch(err => cb('Unable to retrieve Reminders.'));
  }

  findById(id, cb) {
    reminder.findById(id)
      .then(reminder => cb(null, reminder))
      .catch(err => cb('Unable to find Reminder.'));
  }

  create(data, cb) {
    console.log(data);
    let reminder = new Reminder(data);
    reminder.save();

    return cb(null, reminder);
  }

  update(id, data, cb) {
    delete data.id;

    Reminder.findByIdAndUpdate(id, data, { new: true }) // Using { new: true } to return the modified document rather than the original.
      .then((reminder) => {
        if (!reminder) return cb(`The Reminder doesn't exist.`);
        cb(null, reminder);
      })
      .catch(err => cb('Unable to update Reminder.'));
  }

  delete(id, cb) {
    Reminder.findByIdAndRemove(id, { select: '_id' })
      .then((reminder) => {
        if (!reminder) return cb(`The Reminder doesn't exist.`);
        cb(null, id);
      })
      .catch(err => cb('Unable to delete Reminder.'));
  }
}

export default new ReminderService();

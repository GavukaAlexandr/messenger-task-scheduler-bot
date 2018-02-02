import {
  MessengerClient
} from "messaging-api-messenger";
import apiai from "apiai";
import ReminderService from './reminder.services';

//token for DialogFlow API
const apiaiApp = apiai("dfa845929dfc44ada42bb9a3c3962653");
//token for Messenger API
const accessToken =
  "EAAFjqMHaUakBAIZCVcEznRAFvVNZBBjCqVLp1Ocu8biorDfa21QZA" +
  "JQNH5pYuWb0ZCgFk2fyK87bropdcRD8Pe3J7s2u8ZAxWBQFGNjSZCT" +
  "iBGz55g2hT0dZCdHNOWzj1GFiH5R9ZBDv1U14VYZAhHZBdLVm7jIRE" +
  "999dBi5kv4aESewZDZD";
// get accessToken from facebook developers website
const client = MessengerClient.connect(accessToken);

class MessengerService {
  handleEvents(webhook_event) {
    console.log(webhook_event);
    if (webhook_event.message) {
      let request = apiaiApp.textRequest(webhook_event.message.text, {
        sessionId: webhook_event.sender.id

      });

      request.on("response", function (response) {
        // console.log(response);

        // console.log(new Date(response.result.parameters.date + " " + response.result.parameters.time))
        ReminderService.create({
          reminderDate: new Date(response.result.parameters.date + " " + response.result.parameters.time),
          userId: webhook_event.sender.id,
          task: response.result.resolvedQuery,
        }, (err, createdReminder) => {
          if (err) return next(err);

          console.log(createdReminder);
        });
      });

      request.on("error", function (error) {
        console.log(error);
      });

      request.end();

      //TODO: create connect to db****
      //TODO: create model "Reminder"
      //TODO: set reminder to DB



      //TODO: start cron task.

      //TODO:find WAY run task and send reminder
      //TODO:create Reminder template
    }
    if (webhook_event.postback && webhook_event.postback.payload) {
      switch (webhook_event.postback.payload) {
        case "GET_STARTED_BUTTON_PRESSED":
          console.log("GET_STARTED_BUTTON_PRESSED");

          break;

        case "CREATE_REMINDER":
          console.log("CREATE_REMINDER");
          this.sendTextMessage(`
          [ description you task ] DATE  TIME
          DATE - today, tomorrow, 02.02.2018 ect...
          TIME - morning, 18:00, etc...
          `);

          break;

        case "REMOVE_REMINDER":
          console.log("REMOVE_REMINDER");

          break;

        case "SHOW_REMINDERS_FOR_TODAY":
          console.log("SHOW_REMINDERS_FOR_TODAY");

          break;

        case "SHOW_REMINDERS_FOR_TOMORROW":
          console.log("SHOW_REMINDERS_FOR_TOMORROW");

          break;

        case "SHOW_REMINDERS_FOR_WEEK":
          console.log("SHOW_REMINDERS_FOR_WEEK");

          break;

        case "SHOW_REMINDERS_FOR_MONTH":
          console.log("SHOW_REMINDERS_FOR_MONTH");

          break;

        case "SHOW_ALL_REMINDER":
          console.log("SHOW_ALL_REMINDER");

          break;

        default:
          console.log("POSTBACK NOT DEFINED!");

          break;
      }
    }
  }

  handlePrompts(request) {
    // send request to DialogFlow
    if ((task, date, time)) {
      // function for create reminder and send response to messenger
    } else {
      // send ask to messenger
      handlePrompts(dataFromMessenger);
    }
  }

  sendTextMessage(message) {
    client.sendRawBody({
      recipient: {
        id: 1588954187852564
      },
      message: {
        text: message
      }
    });
  }
}

export default new MessengerService();

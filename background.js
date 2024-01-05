const alarmName = "vsb-email-notifier-alarm";
const queryInfo = {
  url: "https://posta.vsb.cz/roundcube/?_task=mail&_mbox=INBOX",
};

chrome.runtime.onInstalled.addListener(() => {
  chrome.alarms.create(alarmName, {
    periodInMinutes: 1,
  });
  chrome.alarms.onAlarm.addListener(
    (alarm) =>
      alarm.name === alarmName &&
      chrome.tabs.query(queryInfo, (tabs) =>
        tabs.forEach(
          (tab) =>
            tab.title.length > 0 &&
            tab.title[0] === "(" &&
            chrome.notifications.create({
              title: "VSB E-mail Notifier",
              message: "Přišla zpráva!",
              iconUrl: "images/monkaOMEGA.png",
              type: "basic",
            })
        )
      )
  );
});

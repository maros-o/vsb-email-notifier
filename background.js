const alarmName = "vsb-email-notifier-alarm";

chrome.runtime.onInstalled.addListener(() => {
  chrome.alarms.create(alarmName, {
    periodInMinutes: 1,
  });
  chrome.alarms.onAlarm.addListener(
    (alarm) =>
      alarm.name === alarmName &&
      chrome.tabs.query(
        {
          url: "https://posta.vsb.cz/roundcube/?_task=mail&_mbox=INBOX",
        },
        (tabs) =>
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

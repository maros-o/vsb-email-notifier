chrome.runtime.onInstalled.addListener(() => {
  chrome.alarms.create("vsb-email-notifier-alarm", {
    periodInMinutes: 1,
  });
  chrome.alarms.onAlarm.addListener(() =>
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

chrome.runtime.onStartup.addListener(() => {
  console.log("VSB E-mail Notifier is running!", new Date());
  chrome.alarms.create("vsb-email-notifier-alarm", { periodInMinutes: 1 });
  chrome.alarms.onAlarm.addListener(() => {
    console.log("Checking for unread messages...", new Date());
    chrome.tabs.query(
      { url: "https://posta.vsb.cz/roundcube/?_task=mail&_mbox=INBOX" },
      (tabs) => {
        console.log("Inbox tabs found:", tabs);
        if (!tabs.length) return;
        const match = tabs[0].title.match(/\((\d+)\)/);
        if (!match) return;
        console.log("Unread messages found:", match[1]);
        chrome.notifications.create({
          title: "VSB E-mail Notifier",
          message: `Nepřečtené zprávy! (${match[1]})`,
          iconUrl: "images/monkaOMEGA.png",
          type: "basic",
        });
      }
    );
  });
});

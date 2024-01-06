const runExtension = () => {
  console.log("VSB E-mail Notifier is running!", new Date().toLocaleString());
  chrome.alarms.create("vsb-email-notifier-alarm", { periodInMinutes: 1 });
  chrome.alarms.onAlarm.addListener(() => {
    console.log("Checking for unread messages...", new Date().toLocaleString());
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
};

chrome.runtime.onStartup.addListener(runExtension);
chrome.runtime.onInstalled.addListener(runExtension);

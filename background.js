chrome.runtime.onInstalled.addListener(() => {
  chrome.alarms.create("vsb-email-notifier", { periodInMinutes: 1 });
  chrome.alarms.onAlarm.addListener(() =>
    chrome.tabs.query(
      { url: "https://posta.vsb.cz/roundcube/?_task=mail&_mbox=INBOX" },
      (tabs) => {
        if (!tabs.length) return;
        const match = tabs[0].title.match(/\((\d+)\)/);
        if (!match) return;
        chrome.notifications.create({
          title: "VSB E-mail Notifier",
          message: `Nepřečtené zprávy! (${match[1]})`,
          iconUrl: "images/monkaOMEGA.png",
          type: "basic",
        });
      }
    )
  );
});

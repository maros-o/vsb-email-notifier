chrome.runtime.onInstalled.addListener(() => {
  console.log('__extension reloaded__');
  checkTitles();
});

chrome.alarms.create("1min", {
  delayInMinutes: 1,
  periodInMinutes: 1
});

chrome.alarms.onAlarm.addListener(function(alarm) {
  if (alarm.name === "1min") {
    checkTitles();
  }
});

var vsb_posta_title = '() VŠB – Technická univerzita Ostrava :: Příchozí pošta';

function checkTitles() 
{
  console.log('checking..');
  chrome.tabs.query({}, function(tabs) {
    tabs.forEach(function (tab) {
      var compare = tab.title.substring(0, 1) + tab.title.substring(2, );
      if (compare == vsb_posta_title) {
        console.log(tab.title);
        notify();
      }
    });
  });
}

function notify() 
{
  console.log('notified');
  chrome.notifications.create(
    {
      title: 'VSB E-mail Notifier',
      message: 'Přišla zpráva!',
      iconUrl: 'images/monkaOMEGA.png',
      type: 'basic'
    }
  )
}
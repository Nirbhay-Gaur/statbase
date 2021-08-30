// Detect Browser
const browser = (userAgent) => {
  let match =
    userAgent.match(
      /(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i
    ) || [];
  let temp;

  if (/trident/i.test(match[1])) {
    temp = /\brv[ :]+(\d+)/g.exec(userAgent) || [];

    return `IE ${temp[1] || ""}`;
  }

  if (match[1] === "Chrome") {
    temp = userAgent.match(/\b(OPR|Edge)\/(\d+)/);

    if (temp !== null) {
      return temp.slice(1).join(" ").replace("OPR", "Opera");
    }

    temp = userAgent.match(/\b(Edg)\/(\d+)/);

    if (temp !== null) {
      return temp.slice(1).join(" ").replace("Edg", "Edge (Chromium)");
    }
  }

  match = match[2]
    ? [match[1], match[2]]
    : [navigator.appName, navigator.appVersion, "-?"];
  temp = userAgent.match(/version\/(\d+)/i);

  if (temp !== null) {
    match.splice(1, 1, temp[1]);
  }

  return match.join(" ");
};

// detect Mobile
const mobile = (userAgent) => {
  const toMatch = [
    /Android/i,
    /webOS/i,
    /iPhone/i,
    /iPad/i,
    /iPod/i,
    /BlackBerry/i,
    /Windows Phone/i,
  ];

  return toMatch.some((toMatchItem) => {
    return userAgent.match(toMatchItem);
  })
    ? "Mobile"
    : "";
};

// Detect OS
const os = (userAgent) => {
  var OSName = "Unknown OS";
  if (userAgent.indexOf("Win") != -1) OSName = "Windows";
  if (userAgent.indexOf("Mac") != -1) OSName = "MacOS";
  if (userAgent.indexOf("X11") != -1) OSName = "UNIX";
  if (userAgent.indexOf("Linux") != -1) OSName = "Linux";

  return OSName;
};

// Generate final result
const detect = (userAgent) => {
  const result = [];
  result.push(browser(userAgent));
  result.push(os(userAgent));
  result.push(mobile(userAgent));

  return result.join(" ");
};

export default detect;

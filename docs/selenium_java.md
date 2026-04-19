# SELENIUM_JAVA

Explore the topics below. Expand each section to read more!

<details class="custom-dropdown">
<summary>Selenium Notes</summary>

<!-- PASTE CONTENT HERE -->
WebDriver Methods
These methods are used to control the browser and manage the WebDriver instance:

get(url): Opens the specified URL in the browser.
getCurrentUrl(): Returns the current URL of the browser.
getTitle(): Returns the title of the current page.
findElement(By by): Finds the first WebElement using the given method.
findElements(By by): Finds all WebElements using the given method.
getPageSource(): Returns the source code of the current page.
close(): Closes the current browser window.
quit(): Closes all browser windows and ends the WebDriver session.
getWindowHandles(): Returns a set of window handles for all open browser windows.
getWindowHandle(): Returns the window handle of the current window.
switchTo(): Switches to a different frame, window, or alert.
switchTo().frame()
switchTo().window()
switchTo().alert()
navigate(): Allows navigation to and from web pages.
navigate().to(url)
navigate().back()
navigate().forward()
navigate().refresh()
manage(): Provides various options to manage the browser.
manage().timeouts()

implicitlyWait(Duration duration): Sets the amount of time the driver should wait when searching for an element if it is not immediately present; use this to handle situations where elements take time to appear.
Scenario: When elements on a page load asynchronously and you want to ensure that WebDriver waits long enough to find all elements without throwing an exception immediately.
pageLoadTimeout(Duration duration): Sets the maximum amount of time to wait for a page to load before throwing an error; use this to handle slow-loading pages.
Scenario: When navigating to a webpage that might take a longer time to load due to heavy content or slow server response.
scriptTimeout(Duration duration): Sets the amount of time to wait for an asynchronous script to finish execution before throwing an error; use this for operations that involve executing JavaScript with a delay.
Scenario: When executing JavaScript code via executeAsyncScript that involves asynchronous operations, such as AJAX calls, which might take some time to complete.
manage().window()

Sure, here are concise explanations of each sub-method of manage().window():

maximize(): Maximizes the browser window to fill the screen.
minimize(): Minimizes the browser window to the taskbar.
fullscreen(): Switches the browser window to full-screen mode.
setPosition(Point targetPosition): Sets the browser window's position to specified x and y coordinates.
setSize(Dimension targetSize): Sets the browser window's size to the specified width and height.
getPosition(): Returns the current position of the browser window as a Point object.
getSize(): Returns the current size of the browser window as a Dimension object.
manage().cookies()

Sure, here are concise explanations of each sub-method of manage().cookies():

addCookie(Cookie cookie): Adds a specified cookie to the current domain.
deleteCookie(Cookie cookie): Deletes a specified cookie from the current domain.
deleteCookieNamed(String name): Deletes a cookie by its name.
deleteAllCookies(): Deletes all cookies from the current domain.
getCookieNamed(String name): Returns the cookie with the specified name.
getCookies(): Returns a set of all cookies for the current domain.
executeScript(script, *args): Executes JavaScript in the context of the current window or frame.
executeAsyncScript(script, *args): Executes asynchronous JavaScript in the context of the current window or frame.

</details>

<details class="custom-dropdown">
<summary>How To</summary>

<!-- PASTE CONTENT HERE -->

</details>

<!-- PASTE CONTENT HERE -->


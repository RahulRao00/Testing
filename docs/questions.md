# QUESTIONS

Explore the topics below. Expand each section to read more!

<details class="custom-dropdown">
<summary>Manual Intro</summary>

<!-- PASTE CONTENT HERE -->

this is manual 

### Methods to Handle Dropdowns:
1. **Select by Visible Text**
2. **Select by Index**
3. **Select by Value**
4. **Deselect Options** (if the dropdown supports multi-select)
5. **Get All Selected Options**
6. **Get Options**

#### Example Code for Each Method:

**1. Select by Visible Text**
This method selects an option by the text that is visible in the dropdown.

```java
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.Select;

public class SelectByVisibleTextExample {
    public static void main(String[] args) {
        System.setProperty("webdriver.chrome.driver", "path/to/chromedriver");

        WebDriver driver = new ChromeDriver();
        driver.get("https://example.com");

        // Find the dropdown element
        WebElement dropdown = driver.findElement(By.id("dropdownId"));

        // Create a Select object
        Select select = new Select(dropdown);

        // Select an option by visible text
        select.selectByVisibleText("Option Text");

        driver.quit();
    }
}
```

</details>

<details class="custom-dropdown">
<summary>Automation Intro</summary>

<!-- PASTE CONTENT HERE -->

</details>

<details class="custom-dropdown">
<summary>Scenario</summary>

<!-- PASTE CONTENT HERE -->

</details>

<details class="custom-dropdown">
<summary>Project</summary>

<!-- PASTE CONTENT HERE -->

</details>

<details class="custom-dropdown">
<summary>Common</summary>

<!-- PASTE CONTENT HERE -->

</details>

<details class="custom-dropdown">
<summary>HR Questions</summary>

<!-- PASTE CONTENT HERE -->

</details>

<!-- PASTE CONTENT HERE -->


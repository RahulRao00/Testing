# How to Format Your Content

Whenever you add new topics or dropdowns, here is exactly how you should structure the markdown so it renders perfectly with the visual CSS we applied, just like the 3rd image!

## Dropdown Template

You can copy and paste this code anytime you want to create a new expandable section:

```html
<details class="custom-dropdown">
  <summary>Click here for new dropdown topic</summary>

  <!-- PASTE YOUR CONTENT BELOW THIS LINE -->

  #### 1. Example Heading
  Here is some plain text describing the topic you want to write about. 

  **Bold Text Note**: You can add emphasis normally.

  ```java
  // Here is heavily formatted code with syntax highlighting!
  public class Example {
      public static void main(String[] args) {
          System.out.println("It will show up colourful just like Image 3!");
      }
  }
  ```

</details>
```

### Important Formatting Rules:
1. **Always use `<details class="custom-dropdown">`**: You must include the `class="custom-dropdown"` part so the custom dark theme box styles properly.
2. **Leave a blank line after `<summary>`**: DO NOT start typing your content immediately after `</summary>`. There must be an empty line between the summary closing tag and your content so standard Markdown can load.
3. **Leave a blank line before `</details>`**: Similar to above, always keep an empty line before the closing details tag.
4. **Use markdown code blocks**: Wrap all code inside ` ```java ` and ` ``` ` (backticks) so that Docsify applies the colored syntax highlighting.

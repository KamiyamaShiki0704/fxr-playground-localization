# FXR Playground Localization
This repo provides localization support for [FXR Playground](https://fxr-playground.pages.dev/). Each language has its own YAML file in the `locales` folder. You can contribute by adding new languages or improving existing translations.

## How to Contribute
1. Fork the repository.
2. Create a new YAML file in the `locales` folder for your language (e.g., `fr-FR.yml` for French), or edit an existing one.
3. Translate the strings in the file. Use the English file (`en-US.yml`) as a reference.
4. Submit a pull request with your changes.

### Guidelines
- Add yourself to the contributors list at the top of the locale file you are editing.
- Use [BCP 47 language tags](https://developer.mozilla.org/en-US/docs/Glossary/BCP_47_language_tag) for file names (e.g., `es-ES.yml` for Spanish as spoken in Spain).
- Test your translations by pressing `Ctrl`+`Alt`+`L` in [FXR Playground](https://fxr-playground.pages.dev/) and pasting your YAML content into the dialog that appears.
- Partial translations are acceptable. Strings that are not translated should be omitted. They will fall back to English.
- Try to keep the strings similar in length or shorter than the original English version to avoid UI issues.
- Do not use locales other than `en-US` as a base for translations. Always refer to the English file for the most accurate and up-to-date strings.
- Some strings have a plural form, indicated by a pipe `|` character in the middle of the string. For example:
  ```yaml
  fileSelection.status.title: Selected FXR | Selected FXRs
  ```
  In this case, the first part ("Selected FXR") will be used if the count is 1, and for counts greater than 1, the second part ("Selected FXRs") will be used. If your language does not have plural forms, you can simply provide a single translation without the pipe.
- Some strings may contain placeholders like `{value}` or `{count}`. These are replaced dynamically with values at runtime. Only the placeholders in the original string should be used in the translation.
- YAML's syntax for string values allows you to not use quotes in most cases, but if your translation contains special characters (like `:`, `-`, or leading/trailing spaces), it's safer to surround the string with quotes to avoid syntax errors.
- Both deep and flat structures are supported. Below is an example of a deep structure:
  ```yaml
  page:
    fxrViews:
      structure:
        ctxMenu:
          copyNode: Copy node
          deleteBranch: Delete branch
  ```
  And here is the equivalent flat structure:
  ```yaml
  page.fxrViews.structure.ctxMenu.copyNode: Copy node
  page.fxrViews.structure.ctxMenu.deleteBranch: Delete branch
  ```
  You can use either format based on your preference. You can even mix both styles within the same file if needed.

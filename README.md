<p align="center">
  <img src="public/unic-logo.svg" alt="ferlab repository img" width="180px" />
</p>
<p align="center">
  <a href="https://opensource.org/licenses/Apache-2.0"><img src="https://img.shields.io/badge/License-Apache%202.0-blue.svg?style=for-the-badge"></a>
</p>

# unic-portal-ui

UI data portal for the UNIC.

## Getting Started

First, build antd theme and run the development server:

```bash
npm run theme
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Github actions

### Shai-Hulud
This action check for the Shai-Hulud vulnerability.
It checks for:
- the vulnerability itself
- unallowed env var exposure
- malicious patterns

> ℹ️ You can acces the project repository to check the targeted patterns: https://github.com/sngular/shai-hulud-integrity-scanner/blob/9ecc202020ef894cef77449ba0c6972bb3f65979/scan-project.sh#L296 

To remove files that should be ignored by the action, edit the ```shai-hulud-check.sh``` script, to add the files path (in the dedicated section)

To be efficient, you should not remove code files, but parse them to remove allowed patterns. 
This can be achived by:
- adding the patterns in the ```shai-hulud-allowed-patterns.txt``` file (you must let an empty new line at the end of the file)
- adding the files by editing the ```shai-hulud-check.sh``` script, to add the files path (in the dedicated section) 

You can check if the scan is valid locally running the make target: ```make check```
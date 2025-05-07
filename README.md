# EbaAaZ

## Project Description

EbaAaZ is a configuration and integration hub powered by the SeCuReDmE framework. It serves as the Protector of Fortitude, an architect of integration, and aims to help users with tasks related to the EbaAaZ application. The application provides a variety of features to facilitate data management, code generation, and user interaction.

## Core Features

- **Data Load & Podcast**: Users can load data into the coordinator's memory, chat, and create a podcast about the data with a mind map graft drafted from all data sources.
- **Input Capture**: Accepts user input of class graft and flow graft built from the mind map graft.
- **Graft-to-Code Conversion**: Transforms the input graft into code using AI. The Gemini deep search model gathers information about the graft and analyzes the app's representation, then the coordinator clarifies and classifies it into function/dir/backend/frontend/middleware class representing action.
- **Codeline Display**: Displays the generated code in the format the user chooses to code with.
- **Workbook Interface**: Provides a workbook interface option to ask, brainstorm, and revise with the coordinator.
- **Code Creation**: Provides a direct link to an idx repo with the code structure and options to copy the generated code to the clipboard or hook specific MCP to the code agent.
- **MiddleWrecks**: Middle wrecks of the coordinator manipulate Google ADK and build AUTOGEN bot to preassemble the code logic.
- **Fluffer Front-End**: Allows users to drag and drop, slide, edit, move, and combine UI elements.

## Installation Instructions

### Prerequisites

- Install Node.js version 20 or higher.
- Install Nix package manager.
- Install the following Nix packages: `nodejs_20`.
- Set up environment variables as specified in the `.env` file.
- Ensure you have a GitHub token and a Gemini API key.
- Install the required dependencies listed in the `package.json` file using `npm install`.
- Follow the configuration guidelines in the `.idx/dev.nix` file for setting up the development environment.
- Ensure you have a compatible code editor, such as VSCode, with the recommended settings in the `.vscode/settings.json` file.

### Steps

1. Clone the repository:
   ```sh
   git clone https://github.com/Celebrum/EbaAaZ.git
   cd EbaAaZ
   ```

2. Install the required dependencies:
   ```sh
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the root directory and add the required environment variables as specified in the `.env` file.

4. Configure the development environment using Nix:
   - Follow the guidelines in the `.idx/dev.nix` file to set up the development environment.

5. Start the development server:
   ```sh
   npm run dev
   ```

## Usage Instructions

### Running the Application

To run the application, use the following command:
```sh
npm run dev
```

### Interacting with the EbaAaZ Chat Assistant

The EbaAaZ chat assistant can be accessed through the Human Hub page. It provides assistance with various tasks related to the EbaAaZ application.

### Uploading and Processing Graft Files

To upload and process graft files, navigate to the Human Hub page and use the Role & Permission Graft Configuration section to upload your graft files.

## Contribution Guidelines

We welcome contributions from the community. To contribute to the project, please follow these guidelines:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Make your changes and commit them with clear and concise commit messages.
4. Push your changes to your forked repository.
5. Create a pull request to the main repository.

## License Information

This project is licensed under the MIT License. See the `LICENSE` file for more details.

## Acknowledgments

We would like to thank all the contributors and third-party resources that have helped in the development of this project.

## Contact Information

For support or inquiries, please contact us at [support@ebaaaz.com](mailto:support@ebaaaz.com).

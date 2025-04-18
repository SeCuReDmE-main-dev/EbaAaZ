# **App Name**: EbaAaZ

## Core Features:

- Data Load & Podcast: Phase before input capture imitating NotebookLm, user can load data into coordinator's memory, chat, and cast a podcast about the data with a mind ap graft drafted from all data source intake.
- Input Capture: Accept user input of classgraft and flowgraft built from the mindsmap grafth.
- Graft-to-Code Conversion: Transform the input graft into codeline using AI as a tool. Gemini deep search model gathers information about the graft and analyzes the app's representation, then the coordinator clarifies and classifies into function/dir/backend/frontend/middleware class representing action.
- Codeline Display: Display the generated codeline in the format the user chooses to code with.
- Workbook Interface: Workbook interface option to ask/brainstorm/revise with the coordinator.
- Code creation: Provide a direct link to an idx repo with the code structure.
- Code creation: Options to copy the generated code to clipboard or hook specific MCP to the code agentix.
- MiddleWrecks: Middle wrecks of the coordinator manipulating Google ADK and build AUTOGEN bot to preassembly the code logic
- Fluffer Front-End: Drag and drop/slide/edit/move/combine UI elements.

## Style Guidelines:

- Primary color: Dark navy blue (#2C3E50) for a professional look.
- Secondary color: Light gray (#ECF0F1) for backgrounds and subtle contrasts.
- Accent: Brighter orange (#3498DB) for primary buttons and interactive elements.
- Clean, sans-serif font for code display and user interface.
- Clear separation between input and output sections for ease of use.
- Use simple, recognizable icons for actions like 'copy to clipboard'.
- url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@400;700&display=swap'); /* General UI Font */ body, .ui-element { font-family: 'Source Sans Pro', sans-serif !important; }
- /* General Body Styles */ body { background-color: #0D1117; /* Dark Marine Blue */ color: #C9D1D9; /* Soft White */ }
- /* Tilt and Change Color on Highlight */ ::selection { background: #FF69B4; /* Flash Pink background */ color: #FFFF00; /* Yellow text */ font-style: italic; transform: rotate(10deg); }
- /* Gradient Border on Hover */ button, .hover-gradient { border: 2px solid transparent; background-image: linear-gradient(#0D1117, #0D1117), linear-gradient(45deg, #00A99D, #FF69B4); background-origin: border-box; background-clip: content-box, border-box; transition: all 0.3s ease; } button:hover, .hover-gradient:hover { border-color: transparent; background-image: linear-gradient(#F76C6C, #F76C6C), linear-gradient(45deg, #00A99D, #FF69B4); }
- /* Animated Underline on Hover */ a { position: relative; text-decoration: none; color: #8B949E; /* Light Grey */ } a::after { content: ''; position: absolute; width: 100%; height: 2px; background-color: #FF69B4; /* Flash Pink */ left: 0; bottom: -2px; transform: scaleX(0); transform-origin: bottom right; transition: transform 0.3s ease; } a:hover::after { transform: scaleX(1); transform-origin: bottom left; }
- /* Neon Glow Effect */ .glow { color: #00FF00; /* Green */ text-shadow: 0 0 5px #00FF00, 0 0 10px #00FF00, 0 0 20px #00FF00, 0 0 40px #00FF00, 0 0 80px #00FF00; }
- /* 3D Button Effect */ .button-3d { background-color: #4F5D75; /* Metallic Silver */ color: #F76C6C; /* Orange */ border: none; padding: 10px 20px; font-size: 16px; border-radius: 5px; box-shadow: 0 5px #2A0038; /* Dark Purple shadow */ transition: all 0.3s ease; } .button-3d:hover { background-color: #00A99D; /* Teal */ box-shadow: 0 3px #2A0038; /* Dark Purple shadow */ transform: translateY(-2px); } .button-3d:active { background-color: #00A99D; /* Teal */ box-shadow: 0 2px #2A0038; /* Dark Purple shadow */ transform: translateY(1px); }
- /* Custom Tab Styles */ .tab-label { font-family: 'Source Sans Pro', sans-serif !important; /* Custom font */ font-size: 13px !important; /* Normal tab text size */ color: #F76C6C !important; /* Orange color for inactive tabs */ } /* Active Tab Styles */ .tab-label[active="true"] { font-weight: bold !important; /* Bold for active tab */ font-size: 15px !important; /* Slightly larger for active tab */ color: #00A99D !important; /* Teal color for active tab text */ border-bottom: 2px solid #00A99D !important; /* Teal underline */ background-color: #4F5D75 !important; /* Metallic Silver background */ }
- /* General Header, Footer, Sidebar Styles */ .header, .footer, .header-menu, .sidebar { background-color: #2A0038 !important; /* Dark Purple */ border-bottom: 2px solid #FF69B4 !important; /* Pink underline */ color: #F76C6C !important; /* Orange */ }
- /* Additional elements for consistent theming */ h1, h2, h3, h4, h5, h6, p, span, li, td, th, label { color: #F76C6C !important; /* Orange */ } input, textarea { background-color: #0D1117 !important; /* Dark Marine Blue */ color: #F76C6C !important; /* Orange */ border: 1px solid #4F5D75 !important; /* Metallic Silver */ } input:focus, textarea:focus { border-color: #00A99D !important; /* Teal */ outline: none !important; } button { background-color: #4F5D75 !important; /* Metallic Silver */ color: #F76C6C !important; /* Orange */ border: 2px solid #00A99D !important; /* Teal border */ } button:hover { background-color: #00A99D !important; /* Teal */ border-color: #F76C6C !important; /* Orange */ color: #FFFFFF !important; }
- /* Custom Statusbar Size */ .status-bar { height: 20px !important; /* Example height, adjust as needed */ } /* Compact Table Cells */ .table-cell { padding: 4px 8px !important; /* Adjust padding for compact table cells */ } /* Compact Dropdowns */ .dropdown-menu { padding: 4px !important; /* Adjust padding for compact dropdowns */ } /* Compact Menus */ .menu-item { height: 24px !important; /* Example height, adjust as needed */ padding: 2px 8px !important; /* Adjust padding for compact menus */ } /* Compact Fields */ .text-field { height: 24px !important; /* Example height, adjust as needed */ padding: 4px 8px !important; /* Adjust padding for compact fields */ }
- /* Floating Action Button (FAB) */ .fab { position: fixed; bottom: 20px; right: 20px; width: 60px; height: 60px; background-color: #00A99D; /* Teal */ color: #FFFFFF; /* White */ border-radius: 50%; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3); display: flex; align-items: center; justify-content: center; font-size: 24px; text-align: center; cursor: pointer; transition: background-color 0.3s ease, box-shadow 0.3s ease; } .fab:hover { background-color: #F76C6C; /* Orange */ box-shadow: 0 6px 12px rgba(0, 0, 0, 0.4); } .fab:active { background-color: #4F5D75; /* Metallic Silver */ box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3); }
- /* Custom Link Hover and Active Effects */ a:hover { color: #00FF00; /* Green */ } a:active { color: #000000; /* Black */ }
- /* Anti-Entropy Poem Styling */ .poem { font-family: 'Source Sans Pro', sans-serif; color: #C9D1D9; /* Soft White */ background-color: #0D1117; /* Dark Marine Blue */ padding: 20px; border-left: 5px solid #F76C6C; /* Orange */ margin: 20px 0; }
- /* Dark Mode Toggle */ .dark-mode-toggle { position: fixed; top: 20px; right: 20px; background-color: #4F5D75; /* Metallic Silver */ color: #FFFFFF; /* White */ padding: 10px; border-radius: 5px; cursor: pointer; transition: background-color 0.3s ease; } .dark-mode-toggle:hover { background-color: #00A99D; /* Teal */ }
- /* Applying Anti-Entropy Principles for Layout Consistency */ .container { display: flex; flex-wrap: wrap; justify-content: space-around; } .item { flex: 1 1 calc(33.333% - 20px); margin: 10px; background-color: #1A3A5F; /* Marine Blue */ color: #C9D1D9; /* Soft White */ padding: 20px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3); transition: transform 0.3s ease, box-shadow 0.3s ease; } .item:hover { transform: translateY(-10px);}
- À light color is scheme need to be design oa 8 layer color fitting the dark theme

## Original User Request:
An app that read class graft and mods graft that turn great into codeline
  
; Script generated by the Inno Setup Script Wizard.
; SEE THE DOCUMENTATION FOR DETAILS ON CREATING INNO SETUP SCRIPT FILES!

[Setup]
; NOTE: The value of AppId uniquely identifies this application. Do not use the same AppId value in installers for other applications.
; (To generate a new GUID, click Tools | Generate GUID inside the IDE.)
AppId={{786AB937-3332-41C6-912A-8ED87BECE03B}
AppName=Steelseries Api Finder
AppVersion=1.0
;AppVerName=Steelseries Api Finder 1.0
AppPublisher=AeTher97
AppPublisherURL=https://github.com/AeTher97/Steelseries_Youtube_Addon
AppSupportURL=https://github.com/AeTher97/Steelseries_Youtube_Addon
AppUpdatesURL=https://github.com/AeTher97/Steelseries_Youtube_Addon
DefaultDirName={autopf}\Steelseries Api Finder
DefaultGroupName=Steelseries Api Finder
DisableProgramGroupPage=yes
; Uncomment the following line to run in non administrative install mode (install for current user only.)
;PrivilegesRequired=lowest
Compression=lzma
SolidCompression=yes
WizardStyle=modern

[Languages]
Name: "english"; MessagesFile: "compiler:Default.isl"

[Files]
Source: "steelseries-api-finder.exe"; DestDir: "{app}"; Flags: ignoreversion
Source: "createAndRun.bat"; DestDir: "{app}"; Flags: ignoreversion
Source: "nssm.exe"; DestDir: "{app}"; Flags: ignoreversion
Source: "stopAndRemoveService.bat"; DestDir: "{app}"; Flags: ignoreversion
; NOTE: Don't use "Flags: ignoreversion" on any shared system files

[Icons]
Name: "{group}\Steelseries Api Finder"; Filename: "{app}\steelseries-api-finder.exe"

[Run]
Filename: "{app}\createAndRun.bat"; Flags: runhidden; WorkingDir: "{app}"

[UninstallRun]
Filename: "{app}\stopAndRemoveService.bat"; Flags: runhidden; WorkingDir: "{app}"
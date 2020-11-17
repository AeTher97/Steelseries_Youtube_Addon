nssm.exe install SteelseriesService "%CD%\steelseries-api-finder.exe"
nssm.exe set SteelseriesService DisplayName "Steelseries Api Finder"
nssm set SteelseriesService AppDirectory %CD%
nssm.exe set SteelseriesService Start SERVICE_AUTO_START
nssm.exe start SteelseriesService
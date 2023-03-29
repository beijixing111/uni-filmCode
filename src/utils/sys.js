
export const getWinAndSysInfo = async () => {
	let win = uni.getWindowInfo();
	let sys = await uni.getSystemInfo();
	return {
		windowWidth: win.windowWidth,
		windowHeight: win.windowHeight,
		statusBarHeight: win.statusBarHeight,
		osName: sys[1].osName
	}
}
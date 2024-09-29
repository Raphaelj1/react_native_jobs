export default {
	expo: {
		scheme: 'acme',
		web: {
			bundler: 'metro',
		},
		plugins: ['expo-router'],
		name: 'react_native_jobs',
		slug: 'react_native_jobs',
		extra: {
			eas: {
				projectId: '441bf445-dc4a-468f-82e2-6769e975ab8b',
			},
		},
		runtimeVersion: {
			policy: 'appVersion',
		},
		updates: {
			url: 'https://u.expo.dev/441bf445-dc4a-468f-82e2-6769e975ab8b',
		},
		android: {
			package: 'com.raphaelj1.react_native_jobs',
		},
		ios: {
			bundleIdentifier: 'raphael',
		},
	},
};

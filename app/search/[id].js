import React, { useState, useEffect } from 'react';
import { Stack, useRouter, useLocalSearchParams } from 'expo-router';
import {
	Text,
	View,
	Image,
	SafeAreaView,
	FlatList,
	ActivityIndicator,
	TouchableOpacity,
} from 'react-native';
import axios from 'axios';

import { ScreenHeaderBtn, NearbyJobCard } from '../../components';
import { COLORS, icons, SIZES } from '../../constants';

import styles from '../../styles/search';
import { RAPID_API_KEY, RAPID_API_URL } from '@env';

const JobSearch = () => {
	const params = useLocalSearchParams();
	const router = useRouter();

	const [searchResult, setSearchResult] = useState([]);
	const [searchLoader, setSearchLoader] = useState(false);
	const [searchError, setSearchError] = useState(null);
	const [page, setPage] = useState(1);

	const handleSearch = async () => {
		setSearchLoader(true);
		setSearchResult([]);

		try {
			const options = {
				method: 'GET',
				url: `${RAPID_API_URL}/search`,
				headers: {
					'x-rapidapi-key': RAPID_API_KEY,
					'x-rapidapi-host': 'jsearch.p.rapidapi.com',
				},
				params: {
					query: params.id,
					page: page.toString(),
				},
			};
			const response = await axios.request(options);
			setSearchResult(response.data.data);
		} catch (error) {
			setSearchError(error);
			console.log(error);
		} finally {
			setSearchLoader(false);
		}
	};

	const handlePagination = (direction) => {
		if (direction === 'left' && page > 1) {
			setPage((prev) => prev - 1);
			handleSearch();
		} else if (direction === 'right') {
			setPage((prev) => prev + 1);
			handleSearch();
		}
	};

	useEffect(() => {
		handleSearch();
	}, []);

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
			<Stack.Screen
				options={{
					headerStyle: { backgroundColor: COLORS.lightWhite },
					headerShadowVisible: false,
					headerLeft: () => (
						<ScreenHeaderBtn
							iconUrl={icons.left}
							dimension="60%"
							handlePress={() => router.back()}
						/>
					),
					headerTitle: '',
				}}
			/>

			<FlatList
				data={searchResult}
				renderItem={({ item }) => (
					<NearbyJobCard
						job={item}
						handleNagigate={() => router.push(`/job-details/${item.job_id}`)}
					/>
				)}
				keyExtractor={(item) => item.job_id}
				contentContainerStyle={{ padding: SIZES.medium, rowGap: SIZES.medium }}
				ListHeaderComponent={() => (
					<>
						<View style={styles.container}>
							<Text style={styles.searchTitle}>{params.id}</Text>
							<Text style={styles.noOfSearchedJobs}>Job Opportunities</Text>
						</View>
						<View style={styles.loaderContainer}>
							{searchLoader ? (
								<ActivityIndicator size="large" color={COLORS.primary} />
							) : searchError ? (
								<Text>Oops something went wrong</Text>
							) : searchResult.length === 0 ? (
								<Text>No jobs found for "{params.id}"</Text>
							) : null}
						</View>
					</>
				)}
				ListFooterComponent={() => (
					<View style={styles.footerContainer}>
						<TouchableOpacity
							style={styles.paginationButton}
							onPress={() => handlePagination('left')}
						>
							<Image
								source={icons.chevronLeft}
								style={styles.paginationImage}
								resizeMode="contain"
							/>
						</TouchableOpacity>
						<View style={styles.paginationTextBox}>
							<Text style={styles.paginationText}>{page}</Text>
						</View>
						<TouchableOpacity
							style={styles.paginationButton}
							onPress={() => handlePagination('right')}
						>
							<Image
								source={icons.chevronRight}
								style={styles.paginationImage}
								resizeMode="contain"
							/>
						</TouchableOpacity>
					</View>
				)}
			/>
		</SafeAreaView>
	);
};

export default JobSearch;

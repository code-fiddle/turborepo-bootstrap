import { flow, types } from 'mobx-state-tree'
import { SECOND } from '../../constants/duration.const'
import { request } from '../../helpers/api'
import { getRootStore } from '../helpers'
import { StateAndCacheKey } from './stateAndCache'

export const CATS_API_V1 = import.meta.env.VITE_CATS_API_V1

export enum CatRoute {
	IMAGES = 'images',
	SEARCH = 'search',
}

export const Cat = types.model('Cat', {
	id: types.identifier,
	url: types.string,
	width: types.number,
	height: types.number,
})

export const Cats = types
	.model('Cats', {
		cats: types.array(Cat),
		cache: types.frozen<{ [key: string]: any }>(),
		state: types.optional(
			types.enumeration('State', ['pending', 'done', 'failure']),
			'done',
		),
		lastSuccessfulFetch: types.optional(types.number, -Infinity),
	})
	.actions((self) => ({
		search: flow(function* () {
			const { api } = getRootStore(self)

			const stateAndCacheKey: StateAndCacheKey = {
				api: `cats`,
				operation: `search`,
			}
			if (!api.stateAndCache.shouldFetch(stateAndCacheKey, true)) {
				return
			}

			api.stateAndCache.updateToPending(stateAndCacheKey)

			try {
				const url = `${CATS_API_V1}/${CatRoute.IMAGES}/${CatRoute.SEARCH}`
				self.cats = yield request({
					url,
					method: 'get',
				})
				api.stateAndCache.updateToDone(stateAndCacheKey, {
					cacheTtl: 5 * SECOND,
				})
			} catch (error) {
				api.stateAndCache.updateToFailure(stateAndCacheKey)
			}
		}),
	}))

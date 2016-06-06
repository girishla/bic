import {MapFilter} from './MapFilter'
import {CachedFilter} from './CachedFilter'
import {RoundFilter} from './RoundFilter'
import {PageRangeFilter} from './PageRangeFilter'
import {RangeFilter} from './RangeFilter'
import {TimestampFilter} from './TimestampFilter'


export default angular.module('elasticslice.filters', [])
  .filter('eslMap', MapFilter)
  .filter('eslCached', CachedFilter)
  .filter('eslRound', RoundFilter)
  .filter('eslPageRange', PageRangeFilter)
  .filter('eslRange', RangeFilter)
  .filter('eslTimestamp', TimestampFilter);
;



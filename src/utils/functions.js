import moment from 'moment'

export const formatDate = (date, withYear = true) =>
	moment(date)
		.local()
		.format(withYear ? 'MMMM DD, YYYY' : 'MMMM DD')

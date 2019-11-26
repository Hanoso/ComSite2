from cominfo.models import Cominfo


def get_cominfo():
	# 获取公司基本信息
	cominfo = Cominfo.objects.all().filter(active=1).order_by('-add_time')[:1]
	return cominfo
using Microsoft.Extensions.DependencyInjection;

namespace MebelOnline.Core.Mappings.Config
{
    public class Mapper : IMapper
    {
        private readonly IServiceProvider _serviceProvider;

        public Mapper(IServiceProvider serviceProvider)
        {
            _serviceProvider = serviceProvider;
        }

        public TTarget Map<TSource, TTarget>(TSource source)
        {
            var specificMapper = _serviceProvider.GetRequiredService<IMappingService<TSource, TTarget>>();
            return specificMapper.Map(source);
        }

        public IList<TTarget> MapList<TSource, TTarget>(IList<TSource> source)
        {
            var specificMapper = _serviceProvider.GetRequiredService<IMappingService<TSource, TTarget>>();
            return specificMapper.MapList(source);
        }
    }
}

// Generated by CodiumAI

describe('getPlaylist', () => {

    // Tests that the method returns a ResponseFormat object with statusCode 200 and playlist data when the playlist has both likes and tracks
    it('should return a ResponseFormat object with statusCode 200 and playlist data when the playlist has both likes and tracks', async () => {
      // Arrange
      const slug = 'valid-slug';
      const playlist = {
        slug: 'valid-slug',
        name: 'Playlist Name',
        bannerId: null,
        viewCount: 10,
        createdAt: '2022-01-01',
        _count: {
          Track: 5,
          Like: 3,
        },
      };
      jest.spyOn(playlistRepo, 'findOneBySlug').mockResolvedValue(playlist);

      // Act
      const result = await playlistsService.getPlaylist(slug);

      // Assert
      expect(result.statusCode).toBe(HttpStatus.OK);
      expect(result.data.slug).toBe(playlist.slug);
      expect(result.data.name).toBe(playlist.name);
      expect(result.data.isHaveBanner).toBe(false);
      expect(result.data.viewCount).toBe(playlist.viewCount);
      expect(result.data.createdAt).toBe(playlist.createdAt);
      expect(result.data.tracksCount).toBe(playlist._count.Track);
      expect(result.data.likesCount).toBe(playlist._count.Like);
    });

});
